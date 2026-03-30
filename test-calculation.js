const ephemeris = require('ephemeris');

// 行星常量
const PLANETS = {
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
function dateToJulianDay(date) {
  return (date.getTime() / 86400000) + 2440587.5;
}

// 计算单个行星位置
function calculatePlanetPosition(planetKey, planetData) {
  return {
    longitude: planetData.position.longitude,
    sign: Math.floor(planetData.position.longitude / 30),
    signDegree: planetData.position.longitude % 30,
  };
}

// 计算完整本命盘
function calculateNatalChart(birthDate, latitude, longitude) {
  console.log('Calculating natal chart for:', birthDate.toISOString(), 'lat:', latitude, 'lon:', longitude);
  
  const chart = ephemeris(birthDate, latitude, longitude, {
    houseSystem: 'Placidus'
  });
  
  console.log('Raw chart data:', {
    sun: chart.sun ? chart.sun.position : 'not found',
    ascendant: chart.ascendant ? chart.ascendant.position : 'not found',
    midheaven: chart.midheaven ? chart.midheaven.position : 'not found',
  });
  
  const planets = {};
  for (const [name, key] of Object.entries(PLANETS)) {
    if (chart[key]) {
      planets[name.toLowerCase()] = calculatePlanetPosition(name, chart[key]);
    }
  }

  return {
    julianDay: dateToJulianDay(birthDate),
    planets,
    houses: chart.houses ? chart.houses.map(h => h.position) : [],
    ascendant: chart.ascendant ? chart.ascendant.position : 0,
    midheaven: chart.midheaven ? chart.midheaven.position : 0,
  };
}

// 测试：1990-01-01 12:00 北京时间
// 北京时区+8，所以UTC时间是 1989-12-31 16:00
const beijingTimezone = 8;
const localDate = new Date(1990, 0, 1, 12, 0); // 1990-01-01 12:00
const utcDate = new Date(localDate.getTime() - beijingTimezone * 60 * 60 * 1000);

console.log('\n========================================');
console.log('Test: 1990-01-01 12:00 Beijing Time');
console.log('Local:', localDate.toISOString());
console.log('UTC:', utcDate.toISOString());
console.log('========================================\n');

const result = calculateNatalChart(utcDate, 39.9042, 116.4074);

console.log('\n========================================');
console.log('RESULTS');
console.log('========================================');
console.log('Sun:', result.planets.sun);
console.log('Moon:', result.planets.moon);
console.log('Ascendant:', result.ascendant, '(sign:', Math.floor(result.ascendant/30) + ')');
console.log('Midheaven:', result.midheaven, '(sign:', Math.floor(result.midheaven/30) + ')');

console.log('\nZodiac signs:');
const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
console.log('Sun in ' + signs[result.planets.sun.sign]);
console.log('Moon in ' + signs[result.planets.moon.sign]);
console.log('Ascendant in ' + signs[Math.floor(result.ascendant/30)]);

console.log('\nExpected results for 1989-12-31 16:00 UTC:');
console.log('- Sun should be around 280° (Capricorn), not 85° (Virgo)');
console.log('- Ascendant should be around 30-35° (Taurus)');
