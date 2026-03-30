const { getAllPlanets } = require('ephemeris');

// 测试：1990-01-01 12:00 北京时间
// 北京时区+8，所以UTC时间是 1989-12-31 16:00
const beijingTimezone = 8;
const localDate = new Date(1990, 0, 1, 12, 0);
const utcDate = new Date(localDate.getTime() - beijingTimezone * 60 * 60 * 1000);

console.log('\n========================================');
console.log('Test: 1990-01-01 12:00 Beijing Time');
console.log('UTC:', utcDate.toISOString());
console.log('========================================\n');

// 调用getAllPlanets (参数: date, longitude, latitude, height)
const chart = getAllPlanets(utcDate, 116.4074, 39.9042, 0);

console.log('Available keys:', Object.keys(chart).slice(0, 20));

console.log('\nSun data:', JSON.stringify(chart.sun, null, 2));
console.log('\nMoon data:', JSON.stringify(chart.moon, null, 2));
console.log('\nAscendant:', chart.ascendant);
console.log('\nMidheaven:', chart.midheaven);

const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

if (chart.sun && chart.sun.position) {
  const sunLon = chart.sun.position.longitude;
  console.log('\n========================================');
  console.log('SUN');
  console.log('========================================');
  console.log('Longitude:', sunLon, '°');
  console.log('Sign:', signs[Math.floor(sunLon / 30) % 12]);
  console.log('Degree in sign:', (sunLon % 30).toFixed(1));
}

if (chart.ascendant) {
  const asc = chart.ascendant.position || chart.ascendant;
  console.log('\n========================================');
  console.log('ASCENDANT');
  console.log('========================================');
  console.log('Longitude:', asc, '°');
  console.log('Sign:', signs[Math.floor(asc / 30) % 12]);
  console.log('Degree in sign:', (asc % 30).toFixed(1));
}

console.log('\nExpected:');
console.log('- Sun should be in Capricorn (~280°)');
console.log('- Ascendant should be in Taurus (~30-40°)');
