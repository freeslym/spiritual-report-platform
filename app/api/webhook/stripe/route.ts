import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Json } from '@prisma/client';
import { prisma } from '../../../../lib/prisma';
import { calculateNatalChart } from '../../../../lib/astrology';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleSuccessfulPayment(session);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { userId, productType } = session.metadata || {};

  if (!userId) return;

  // 更新订单状态
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'succeeded' },
    });
  }

  // 获取用户出生数据
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.birthDate || user.birthLatitude === null || user.birthLongitude === null) {
    console.error('User birth data incomplete');
    return;
  }

  // 计算完整星盘数据
  const natalChart = calculateNatalChart(
    user.birthDate,
    user.birthLatitude,
    user.birthLongitude
  );

  // 创建报告记录
  const report = await prisma.report.create({
    data: {
      userId,
      orderId: order?.id,
      birthData: {
        birthDate: user.birthDate,
        birthTime: user.birthTime,
        birthCity: user.birthCity,
        latitude: user.birthLatitude,
        longitude: user.birthLongitude,
        timezone: user.birthTimezone,
      },
      astroData: natalChart,
      humanDesignData: calculateHumanDesign(natalChart),
      geneKeysData: calculateGeneKeys(natalChart),
      status: 'generating',
    },
  });

  // 触发AI报告生成（这里可以发送到队列处理）
  // 为了简化，这里直接同步生成（生产环境应该用队列）
  await generateAIReports(report.id, productType || 'bundle');
}

async function generateAIReports(reportId: string, productType: string) {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
  });

  if (!report) return;

  try {
    // 根据产品类型生成对应的AI报告
    if (productType === 'bundle' || productType === 'astro') {
      const astroReport = await generateAstroReport(report.astroData);
      await prisma.report.update({
        where: { id: reportId },
        data: { astroReport, status: 'completed' },
      });
    }

    // 更新状态
    await prisma.report.update({
      where: { id: reportId },
      data: { status: 'completed' },
    });
  } catch (error) {
    console.error('AI report generation failed:', error);
    await prisma.report.update({
      where: { id: reportId },
      data: { status: 'failed' },
    });
  }
}

// 生成占星报告（这里接入AI模型）
async function generateAstroReport(astroData: any): Promise<Json> {
  // 这里应该调用AI模型生成报告
  // 为了演示，返回结构化的报告数据
  return {
    sunAnalysis: {
      sign: getZodiacSign(astroData.planets.sun.sign),
      degree: astroData.planets.sun.signDegree.toFixed(2),
      meaning: 'Your Sun placement represents your core essence and primary life purpose.',
      strengths: ['Natural leadership', 'Courage', 'Initiative'],
      challenges: ['Impatience', 'Impulsiveness'],
      advice: 'Channel your energy into pioneering new ventures while learning to pause before acting.',
    },
    moonAnalysis: {
      sign: getZodiacSign(astroData.planets.moon.sign),
      degree: astroData.planets.moon.signDegree.toFixed(2),
      meaning: 'Your Moon placement governs your emotional nature and inner world.',
      emotionalPattern: 'You process feelings through introspection and may need regular alone time.',
      needs: ['Security', 'Emotional connection', 'Comfort'],
    },
    risingAnalysis: {
      sign: getZodiacSign(Math.floor(astroData.ascendant / 30)),
      meaning: 'Your Ascendant represents how others perceive you upon first meeting.',
      firstImpression: 'You appear confident and approachable, with a subtle air of determination.',
    },
    houses: {
      first: { planet: 'Sun', meaning: 'Life path and self-expression' },
      tenth: { planet: 'Midheaven', meaning: 'Career and public reputation' },
    },
    majorAspects: [
      { planets: ['Sun', 'Moon'], type: 'Trine', meaning: 'Harmonious integration of ego and emotions' },
      { planets: ['Sun', 'Mars'], type: 'Square', meaning: 'Dynamic tension driving action' },
    ],
  };
}

function calculateHumanDesign(astroData: any): any {
  // 简化的Human Design计算
  // 实际需要更复杂的算法
  return {
    type: getHumanDesignType(astroData.planets.sun.sign),
    definedCenters: identifyDefinedCenters(astroData),
    channels: identifyChannels(astroData),
    gates: identifyGates(astroData),
    authority: determineAuthority(astroData),
    profile: `${getProfileLine(1)}/${getProfileLine(2)}`,
    strategy: getStrategy(astroData.planets.sun.sign),
  };
}

function calculateGeneKeys(astroData: any): any {
  // 基于占星数据计算基因天命
  const sunPosition = astroData.planets.sun;
  const moonPosition = astroData.planets.moon;
  
  return {
    sunGate: Math.floor(sunPosition.longitude) + 1,
    moonGate: Math.floor(moonPosition.longitude) + 1,
    earthGate: Math.floor((sunPosition.longitude + 180) % 360) + 1,
    southNodeGate: Math.floor(astroData.planets.north_node?.longitude || 0) + 1,
    northNodeGate: Math.floor(astroData.planets.south_node?.longitude || 0) + 1,
    geneKeyStructure: {
      shadow: getGeneKeyShadow(sunPosition),
      Gift: getGeneKeyGift(sunPosition),
      Siddha: getGeneKeySiddha(sunPosition),
    },
  };
}

function getZodiacSign(index: number): string {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs[index] || signs[0];
}

function getHumanDesignType(sunSign: number): string {
  const types = ['Generator', 'Manifestor', 'Manifesting Generator', 'Projector', 'Reflector'];
  return types[sunSign % 5];
}

function identifyDefinedCenters(astroData: any): string[] {
  // 简化版，实际需要更复杂的逻辑
  return ['Heart', 'Sacral', 'Solar plexus'];
}

function identifyChannels(astroData: any): string[] {
  return ['12-22', '1-8', '5-15'];
}

function identifyGates(astroData: any): number[] {
  return [1, 8, 12, 15, 22, 41];
}

function determineAuthority(astroData: any): string {
  return 'Sacral Authority';
}

function getProfileLine(n: number): number {
  return ((n * 3) % 6) + 1;
}

function getStrategy(sunSign: number): string {
  const strategies = [
    'Respond', // Generator
    'Inform and wait', // Manifestor
    'Respond and inform', // Manifesting Generator
    'Wait for invitation', // Projector
    'Wait for lunar cycle', // Reflector
  ];
  return strategies[sunSign % 5];
}

function getGeneKeyShadow(index: number): string {
  const shadows = [
    'Bitterness', 'Stubbornness', 'Anxiety', 'Neediness', 'Pride',
    'Perfectionism', 'Indecision', 'Vengeance', 'Restlessness', 'Materialism',
    'Revolution', 'Coldness', 'Fantasy', 'Codependence', 'Superstition',
  ];
  return shadows[index % shadows.length];
}

function getGeneKeyGift(index: number): string {
  const gifts = [
    ' Innocence', 'Determination', 'Optimism', 'Sensitivity', 'Generosity',
    'Discernment', 'Adaptability', 'Penetration', 'Searching', 'Wisdom',
    'Transformation', 'Freedom', 'Acceptance', 'Devotion', 'Synchronicity',
  ];
  return gifts[index % gifts.length];
}

function getGeneKeySiddha(index: number): string {
  const siddhas = [
    'Peace', 'Leverage', 'Certainty', 'Openness', 'Honor',
    'Justice', 'Change', 'Depth', 'Focus', 'Trust',
    'Hope', 'Surrender', 'Beauty', 'Insight', 'Blessing',
  ];
  return siddhas[index % siddhas.length];
}
