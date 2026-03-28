import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { calculateNatalChart } from '../../../../lib/astrology';

// Lazy initialize Stripe to avoid build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
  });
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session, prisma);
    }

    return NextResponse.json({ received: true });
  } finally {
    await prisma.$disconnect();
  }
}

async function handleSuccessfulPayment(session: any, prisma: PrismaClient) {
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

  // 创建报告记录 - JSON数据序列化为字符串
  const birthDataJson = JSON.stringify({
    birthDate: user.birthDate,
    birthTime: user.birthTime,
    birthCity: user.birthCity,
    latitude: user.birthLatitude,
    longitude: user.birthLongitude,
    timezone: user.birthTimezone,
  });

  const report = await prisma.report.create({
    data: {
      userId,
      orderId: order?.id,
      birthData: birthDataJson,
      astroData: JSON.stringify(natalChart),
      humanDesignData: JSON.stringify(calculateHumanDesign(natalChart)),
      geneKeysData: JSON.stringify(calculateGeneKeys(natalChart)),
      status: 'generating',
    },
  });

  // 触发AI报告生成（这里可以发送到队列处理）
  // 为了简化，这里直接同步生成（生产环境应该用队列）
  await generateAIReports(report.id, productType || 'bundle', prisma);
}

async function generateAIReports(reportId: string, productType: string, prisma: PrismaClient) {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
  });

  if (!report) return;

  try {
    // 解析 astroData
    const astroData = report.astroData ? JSON.parse(report.astroData) : null;

    // 根据产品类型生成对应的AI报告
    if (productType === 'bundle' || productType === 'astro') {
      const astroReport = await generateAstroReport(astroData);
      await prisma.report.update({
        where: { id: reportId },
        data: { 
          astroReport: JSON.stringify(astroReport),
          status: 'completed' 
        },
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

// 调用 MiniMax API 生成占星报告
async function generateAstroReport(astroData: any): Promise<any> {
  try {
    const sunSign = getZodiacSign(astroData?.planets?.sun?.sign || 0);
    const moonSign = getZodiacSign(astroData?.planets?.moon?.sign || 0);
    const ascSign = getZodiacSign(Math.floor(astroData?.ascendant || 0) / 30);
    const sunDegree = astroData?.planets?.sun?.signDegree?.toFixed(2) || '0.00';
    const moonDegree = astroData?.planets?.moon?.signDegree?.toFixed(2) || '0.00';

    const prompt = `作为专业的占星师，请根据以下星盘数据生成个性化解读：
    
出生信息：
- 太阳：${sunSign} ${sunDegree}°
- 月亮：${moonSign} ${moonDegree}°
- 上升星座：${ascSign}

请以JSON格式返回以下三个部分的分析（不要包含任何markdown代码块）：
1. 太阳分析：核心本质、生命目的、优势、挑战、建议
2. 月亮分析：情感本质、情绪模式、内在需求
3. 上升分析：第一印象、外在表现

JSON格式要求：
{
  "sunAnalysis": {
    "sign": "太阳星座",
    "degree": "度数",
    "meaning": "核心本质",
    "strengths": ["优势1", "优势2", "优势3"],
    "challenges": ["挑战1", "挑战2"],
    "advice": "建议"
  },
  "moonAnalysis": {
    "sign": "月亮星座",
    "degree": "度数",
    "meaning": "情感本质",
    "emotionalPattern": "情绪模式",
    "needs": ["需求1", "需求2", "需求3"]
  },
  "risingAnalysis": {
    "sign": "上升星座",
    "meaning": "第一印象",
    "firstImpression": "外在表现"
  }
}`;

    const response = await fetch('https://api.minimax.chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // 解析 AI 返回的 JSON
    let aiContent = data.choices?.[0]?.message?.content || '';
    
    // 提取 JSON（处理可能的 markdown 代码块）
    const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                     aiContent.match(/```\s*([\s\S]*?)\s*```/) ||
                     [null, aiContent];
    
    let aiReport;
    try {
      aiReport = JSON.parse(jsonMatch[1] || aiContent);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      // 如果解析失败，返回默认模板
      aiReport = {
        sunAnalysis: {
          sign: sunSign,
          degree: sunDegree,
          meaning: 'Your Sun placement represents your core essence and primary life purpose.',
          strengths: ['Natural leadership', 'Courage', 'Initiative'],
          challenges: ['Impatience', 'Impulsiveness'],
          advice: 'Channel your energy into pioneering new ventures while learning to pause before acting.',
        },
        moonAnalysis: {
          sign: moonSign,
          degree: moonDegree,
          meaning: 'Your Moon placement governs your emotional nature and inner world.',
          emotionalPattern: 'You process feelings through introspection and may need regular alone time.',
          needs: ['Security', 'Emotional connection', 'Comfort'],
        },
        risingAnalysis: {
          sign: ascSign,
          meaning: 'Your Ascendant represents how others perceive you upon first meeting.',
          firstImpression: 'You appear confident and approachable, with a subtle air of determination.',
        },
      };
    }

    return aiReport;
  } catch (error) {
    console.error('Error calling MiniMax API:', error);
    // 返回默认模板
    const sunSign = getZodiacSign(astroData?.planets?.sun?.sign || 0);
    const moonSign = getZodiacSign(astroData?.planets?.moon?.sign || 0);
    const ascSign = getZodiacSign(Math.floor(astroData?.ascendant || 0) / 30);
    
    return {
      sunAnalysis: {
        sign: sunSign,
        degree: astroData?.planets?.sun?.signDegree?.toFixed(2) || '0.00',
        meaning: 'Your Sun placement represents your core essence and primary life purpose.',
        strengths: ['Natural leadership', 'Courage', 'Initiative'],
        challenges: ['Impatience', 'Impulsiveness'],
        advice: 'Channel your energy into pioneering new ventures while learning to pause before acting.',
      },
      moonAnalysis: {
        sign: moonSign,
        degree: astroData?.planets?.moon?.signDegree?.toFixed(2) || '0.00',
        meaning: 'Your Moon placement governs your emotional nature and inner world.',
        emotionalPattern: 'You process feelings through introspection and may need regular alone time.',
        needs: ['Security', 'Emotional connection', 'Comfort'],
      },
      risingAnalysis: {
        sign: ascSign,
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
}

function calculateHumanDesign(astroData: any): any {
  // 简化的Human Design计算
  // 实际需要更复杂的算法
  return {
    type: getHumanDesignType(astroData?.planets?.sun?.sign || 0),
    definedCenters: identifyDefinedCenters(astroData),
    channels: identifyChannels(astroData),
    gates: identifyGates(astroData),
    authority: determineAuthority(astroData),
    profile: `${getProfileLine(1)}/${getProfileLine(2)}`,
    strategy: getStrategy(astroData?.planets?.sun?.sign || 0),
  };
}

function calculateGeneKeys(astroData: any): any {
  // 基于占星数据计算基因天命
  const sunPosition = astroData?.planets?.sun || { longitude: 0 };
  const moonPosition = astroData?.planets?.moon || { longitude: 0 };
  
  return {
    sunGate: Math.floor(sunPosition.longitude) + 1,
    moonGate: Math.floor(moonPosition.longitude) + 1,
    earthGate: Math.floor((sunPosition.longitude + 180) % 360) + 1,
    southNodeGate: Math.floor(astroData?.planets?.north_node?.longitude || 0) + 1,
    northNodeGate: Math.floor(astroData?.planets?.south_node?.longitude || 0) + 1,
    geneKeyStructure: {
      shadow: getGeneKeyShadow(sunPosition.longitude),
      Gift: getGeneKeyGift(sunPosition.longitude),
      Siddha: getGeneKeySiddha(sunPosition.longitude),
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
