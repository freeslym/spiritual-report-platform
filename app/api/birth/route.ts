import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { calculateNatalChart } from '../../../lib/astrology';

// 出生信息录入接口
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      name,
      birthDate, 
      birthTime, 
      birthCity,
      latitude,
      longitude,
      timezone 
    } = body;

    // 创建或获取用户
    let user = await prisma.user.findFirst({
      where: email ? { email } : { id: 'anonymous' },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          birthDate: new Date(birthDate),
          birthTime,
          birthCity,
          birthLatitude: latitude,
          birthLongitude: longitude,
          birthTimezone: timezone,
        },
      });
    }

    // 计算本命盘数据
    const natalChart = calculateNatalChart(
      new Date(birthDate),
      latitude || 0,
      longitude || 0
    );

    // 生成免费报告（2-3句摘要）
    const freeSummary = generateFreeSummary(natalChart);

    return NextResponse.json({
      success: true,
      userId: user.id,
      natalChart,
      freeSummary,
    });
  } catch (error) {
    console.error('Birth data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process birth data' },
      { status: 500 }
    );
  }
}

// 生成免费摘要（巴纳姆效应语句）
function generateFreeSummary(natalChart: any): string[] {
  const sunSign = getZodiacSign(natalChart.planets.sun.sign);
  const moonSign = getZodiacSign(natalChart.planets.moon.sign);
  const ascSign = getZodiacSign(Math.floor(natalChart.ascendant / 30));
  
  return [
    `Your ${sunSign} Sun sign reveals a core nature driven by ${getSunCharacteristic(sunSign)}. People with this placement often find themselves ${getSunTrait(sunSign)}.`,
    `With a ${moonSign} Moon, your emotional world operates on a wavelength that's uniquely yours. ${getMoonTrait(moonSign)}`,
    `Your ${ascSign} Ascendant creates a first impression that others perceive as ${getAscTrait(ascSign)}. This external layer often conceals a more complex inner landscape.`,
  ];
}

function getZodiacSign(index: number): string {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs[index] || 'Aries';
}

function getSunCharacteristic(sign: string): string {
  const characteristics: Record<string, string> = {
    Aries: 'bold initiative and pioneering spirit',
    Taurus: 'steady persistence and material security',
    Gemini: 'curious adaptability and intellectual agility',
    Cancer: 'nurturing protection and emotional depth',
    Leo: 'creative self-expression and generous warmth',
    Virgo: 'practical analysis and helpful service',
    Libra: 'harmonic balance and relationship elegance',
    Scorpio: 'transformative power and psychological depth',
    Sagittarius: 'optimistic expansion and philosophical truth',
    Capricorn: 'ambitious discipline and structural achievement',
    Aquarius: 'innovative individuality and humanitarian vision',
    Pisces: 'compassionate transcendence and artistic sensitivity',
  };
  return characteristics[sign] || characteristics.Aries;
}

function getSunTrait(sign: string): string {
  const traits: Record<string, string> = {
    Aries: 'drawn to new beginnings and competitive challenges',
    Taurus: 'seeking comfort, beauty, and tangible results',
    Gemini: 'communicating, learning, and connecting ideas',
    Cancer: 'nurturing connections and protecting loved ones',
    Leo: 'seeking recognition and creative self-expression',
    Virgo: 'perfecting systems and helping others practically',
    Libra: 'creating harmony and forming meaningful partnerships',
    Scorpio: ' probing depths and transforming through intensity',
    Sagittarius: 'exploring possibilities and seeking meaning',
    Capricorn: 'building lasting structures and achieving goals',
    Aquarius: 'championing change and unique individual expression',
    Pisces: 'dreaming, creating, and transcending boundaries',
  };
  return traits[sign] || traits.Aries;
}

function getMoonTrait(sign: string): string {
  const traits: Record<string, string> = {
    Aries: 'Your emotional responses are quick, direct, and impulsive.',
    Taurus: 'You seek emotional security through stability and sensory pleasure.',
    Gemini: 'Your feelings shift rapidly, fueled by curiosity and communication.',
    Cancer: 'Your emotional world is deeply tied to home, family, and the past.',
    Leo: 'You crave emotional validation and creative recognition.',
    Virgo: 'You process emotions through analysis and practical help.',
    Libra: 'Your emotions seek balance, harmony, and meaningful connection.',
    Scorpio: 'Your emotions run deep, intense, and transformative.',
    Sagittarius: 'You find emotional freedom through exploration and adventure.',
    Capricorn: 'You approach emotions with discipline and long-term security in mind.',
    Aquarius: 'You emotional detach at times, valuing freedom over intensity.',
    Pisces: 'You are highly sensitive, intuitive, and emotionally receptive.',
  };
  return traits[sign] || traits.Aries;
}

function getAscTrait(sign: string): string {
  const traits: Record<string, string> = {
    Aries: 'bold, direct, and immediately engaging',
    Taurus: 'grounded, patient, and quietly determined',
    Gemini: 'curious, adaptable, and intellectually stimulating',
    Cancer: 'warm, protective, and intuitively perceptive',
    Leo: 'confident, charismatic, and theatrically expressive',
    Virgo: 'analytical, modest, and practically oriented',
    Libra: 'diplomatic, charming, and aesthetically refined',
    Scorpio: 'magnetic, intense, and psychologically penetrating',
    Sagittarius: 'optimistic, adventurous, and philosophically oriented',
    Capricorn: 'serious, ambitious, and strategically minded',
    Aquarius: 'unconventional, progressive, and intellectually independent',
    Pisces: 'sensitive, dreamy, and artistically gifted',
  };
  return traits[sign] || traits.Aries;
}
