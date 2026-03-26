import ephemeris from 'ephemeris';

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
  NORTH_NODE: 'northnode',
  CHIRON: 'chiron',
};

// 计算单个行星位置
export function calculatePlanetPosition(
  planetKey: string,
  planetData: any
) {
  return {
    longitude: planetData.position.longitude,
    latitude: planetData.position.latitude,
    distance: planetData.position.distance,
    speedLongitude: planetData.speed.longitude,
    speedLatitude: planetData.speed.latitude,
    speedDistance: planetData.speed.distance,
    // 计算星座
    sign: Math.floor(planetData.position.longitude / 30),
    signDegree: planetData.position.longitude % 30,
  };
}

// 公历转儒略日
export function dateToJulianDay(date: Date) {
  // 简化版儒略日计算
  return (date.getTime() / 86400000) + 2440587.5;
}

// 计算完整本命盘
export function calculateNatalChart(
  birthDate: Date,
  latitude: number,
  longitude: number
) {
  // 调用ephemeris计算所有数据
  const chart = ephemeris(birthDate, latitude, longitude, {
    houseSystem: 'Placidus'
  });
  
  // 计算所有行星位置
  const planets: Record<string, any> = {};
  for (const [name, key] of Object.entries(PLANETS)) {
    planets[name.toLowerCase()] = calculatePlanetPosition(name, chart[key as keyof typeof chart]);
  }

  // 计算南交点（北交点对冲180度）
  planets.south_node = {
    ...planets.north_node,
    longitude: (planets.north_node.longitude + 180) % 360,
    sign: Math.floor((planets.north_node.longitude + 180) % 360 / 30),
    signDegree: ((planets.north_node.longitude + 180) % 360) % 30,
  };

  return {
    julianDay: dateToJulianDay(birthDate),
    planets,
    houses: chart.houses.map((h: any) => h.position), // 12个宫头位置
    ascendant: chart.ascendant.position, // 上升星座
    midheaven: chart.midheaven.position, // 中天
  };
}
