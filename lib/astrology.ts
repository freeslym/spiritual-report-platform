import swisseph from 'swisseph';

// 初始化swisseph路径
swisseph.swe_set_ephe_path('/usr/share/ephe');

// 行星ID常量
export const PLANETS = {
  SUN: swisseph.SE_SUN,
  MOON: swisseph.SE_MOON,
  MERCURY: swisseph.SE_MERCURY,
  VENUS: swisseph.SE_VENUS,
  MARS: swisseph.SE_MARS,
  JUPITER: swisseph.SE_JUPITER,
  SATURN: swisseph.SE_SATURN,
  URANUS: swisseph.SE_URANUS,
  NEPTUNE: swisseph.SE_NEPTUNE,
  PLUTO: swisseph.SE_PLUTO,
  NORTH_NODE: swisseph.SE_TRUE_NODE,
  SOUTH_NODE: swisseph.SE_TRUE_NODE + 1,
  CHIRON: swisseph.SE_CHIRON,
};

// 计算单个行星位置
export function calculatePlanetPosition(
  planet: number,
  julianDay: number,
  flags: number = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH
) {
  const result = swisseph.swe_calc_ut(julianDay, planet, flags);
  return {
    longitude: result[0],
    latitude: result[1],
    distance: result[2],
    speedLongitude: result[3],
    speedLatitude: result[4],
    speedDistance: result[5],
    // 计算星座
    sign: Math.floor(result[0] / 30),
    signDegree: result[0] % 30,
  };
}

// 公历转儒略日
export function dateToJulianDay(date: Date) {
  return swisseph.swe_julday(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600,
    swisseph.SE_GREG_CAL
  );
}

// 计算完整本命盘
export function calculateNatalChart(
  birthDate: Date,
  latitude: number,
  longitude: number
) {
  const julianDay = dateToJulianDay(birthDate);
  
  // 计算所有行星位置
  const planets: Record<string, any> = {};
  for (const [name, id] of Object.entries(PLANETS)) {
    planets[name.toLowerCase()] = calculatePlanetPosition(id, julianDay);
  }

  // 计算宫位（Placidus分宫制）
  const houses = swisseph.swe_houses(
    julianDay,
    latitude,
    longitude,
    'P'.charCodeAt(0) // Placidus分宫制
  );

  return {
    julianDay,
    planets,
    houses: houses[0].slice(1, 13), // 12个宫头位置
    ascendant: houses[1][0], // 上升星座
    midheaven: houses[1][1], // 中天
  };
}
