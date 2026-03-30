// @ts-ignore - getAllPlanets is exported at runtime despite TypeScript type issues
const { getAllPlanets } = require('ephemeris');

// 行星常量
export const PLANETS = {
  SUN: 'sun',
  MOON: 'moon',
  MERCURY: 'mercury',
  VENUS: 'venus',
  MARS: 'mars',
  JUPITER: 'jupiter',
  SATURN: 'saturn',
  URANUS: 'uranus',
  NEPTUNE: 'neptune',
  PLUTO: 'pluto',
};

// 公历转儒略日
export function dateToJulianDay(date: Date) {
  return (date.getTime() / 86400000) + 2440587.5;
}

// 计算单个行星位置（从ephemeris库的observed对象提取）
export function calculatePlanetPosition(planetData: any) {
  if (!planetData) {
    return {
      longitude: 0,
      sign: 0,
      signDegree: 0,
    };
  }
  
  // 从observed对象中提取视黄经（apparentLongitudeDd）
  const longitude = planetData.apparentLongitudeDd || 0;
  
  return {
    longitude: Math.abs(longitude),
    sign: Math.floor(Math.abs(longitude) / 30) % 12,
    signDegree: Math.abs(longitude) % 30,
  };
}

// 计算宫位（简化版Placidus宫位系统）
export function calculateHouses(ascendant: number): Array<{ cusp: number; sign: number }> {
  const houses = [];
  for (let i = 0; i < 12; i++) {
    // 每个宫相隔30度（简化）
    const cusp = (ascendant + i * 30) % 360;
    houses.push({
      cusp,
      sign: Math.floor(cusp / 30) % 12,
    });
  }
  return houses;
}

// 计算完整本命盘
export function calculateNatalChart(
  birthDate: Date,
  latitude: number,
  longitude: number
) {
  // ephemeris库的参数顺序是 (date, longitude, latitude, height)
  const chart = getAllPlanets(birthDate, longitude, latitude, 0);
  
  // 计算所有行星位置
  const planets: Record<string, any> = {};
  
  // 行星名称映射（ephemeris库使用的名称）
  const planetKeys = [
    'sun', 'moon', 'mercury', 'venus', 'mars',
    'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'chiron'
  ];
  
  if (chart.observed) {
    for (const key of planetKeys) {
      if (chart.observed[key]) {
        planets[key] = calculatePlanetPosition(chart.observed[key]);
      }
    }
  }

  // Simplified ascendant calculation (based on date and location)
  const baseAscendant = 280 + (longitude / 15) * 15 - 90;
  const ascendant = (baseAscendant + birthDate.getTime() / 1000000000) % 360;
  const midheaven = (ascendant + 90) % 360;

  return {
    julianDay: dateToJulianDay(birthDate),
    planets,
    houses: calculateHouses(ascendant),
    ascendant,
    midheaven,
  };
}
