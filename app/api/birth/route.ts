import { NextRequest, NextResponse } from 'next/server';

// 出生信息录入接口（简化测试版）
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

    console.log('Birth request received:', { email, name, birthDate, latitude, longitude });

    // 返回模拟数据
    const mockUserId = 'mock_user_' + Date.now();
    
    const mockNatalChart = {
      planets: {
        sun: { sign: 5, signDegree: 25.3, longitude: 85.3 }, // Leo
        moon: { sign: 9, signDegree: 12.7, longitude: 282.7 }, // Capricorn
        mercury: { sign: 5, signDegree: 10.2, longitude: 70.2 },
        venus: { sign: 3, signDegree: 28.5, longitude: 58.5 },
        mars: { sign: 7, signDegree: 15.8, longitude: 225.8 },
        jupiter: { sign: 2, signDegree: 8.4, longitude: 38.4 },
        saturn: { sign: 10, signDegree: 22.1, longitude: 312.1 },
        uranus: { sign: 0, signDegree: 5.6, longitude: 5.6 },
        neptune: { sign: 9, signDegree: 18.3, longitude: 288.3 },
        pluto: { sign: 7, signDegree: 25.9, longitude: 235.9 },
      },
      ascendant: 30.5, // ~Taurus
      midheaven: 320.8, // ~Aquarius
      houses: [
        { cusp: 30.5, sign: 1 },
        { cusp: 60.2, sign: 2 },
        { cusp: 90.8, sign: 3 },
        { cusp: 120.5, sign: 4 },
        { cusp: 150.2, sign: 5 },
        { cusp: 180.8, sign: 6 },
        { cusp: 210.5, sign: 7 },
        { cusp: 240.2, sign: 8 },
        { cusp: 270.8, sign: 9 },
        { cusp: 300.5, sign: 10 },
        { cusp: 330.2, sign: 11 },
        { cusp: 360.0, sign: 0 },
      ],
    };

    const freeSummary = generateFreeSummary(mockNatalChart);

    return NextResponse.json({
      success: true,
      userId: mockUserId,
      natalChart: mockNatalChart,
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
    Scorpio: 'probing depths and transforming through intensity',
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
    Cancer: 'Your emotional world is deeply tied to home, family, and past.',
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
