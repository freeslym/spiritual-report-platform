// Geocoding and timezone conversion tools

// Simplified coordinate database for testing
const CITY_COORDS: Record<string, { lat: number; lon: number; timezone: number }> = {
  'beijing': { lat: 39.9042, lon: 116.4074, timezone: 8 },
  'shanghai': { lat: 31.2304, lon: 121.4737, timezone: 8 },
  'guangzhou': { lat: 23.1291, lon: 113.2644, timezone: 8 },
  'shenzhen': { lat: 22.5431, lon: 114.0579, timezone: 8 },
  'new york': { lat: 40.7128, lon: -74.0060, timezone: -5 },
  'london': { lat: 51.5074, lon: -0.1278, timezone: 0 },
  'tokyo': { lat: 35.6762, lon: 139.6503, timezone: 9 },
  'paris': { lat: 48.8566, lon: 2.3522, timezone: 1 },
  'los angeles': { lat: 34.0522, lon: -118.2437, timezone: -8 },
  'san francisco': { lat: 37.7749, lon: -122.4194, timezone: -8 },
  'chicago': { lat: 41.8781, lon: -87.6298, timezone: -6 },
  'seattle': { lat: 47.6062, lon: -122.3321, timezone: -8 },
  'mumbai': { lat: 19.0760, lon: 72.8777, timezone: 5.5 },
  'sydney': { lat: -33.8688, lon: 151.2093, timezone: 11 },
};

/**
 * Get coordinates and timezone by city name
 */
export async function geocodeLocation(city: string): Promise<{
  lat: number;
  lon: number;
  timezone: number;
}> {
  const
 normalizedCity = city.toLowerCase().trim();

  // Try to find in built-in database
  for (const [key, coords] of Object.entries(CITY_COORDS)) {
    if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
      return coords;
    }
  }

  // Default to Beijing coordinates
  console.warn(`City not found in database: ${city}, using Beijing as fallback`);
  return CITY_COORDS['beijing'];
}

/**
 * Convert local time to UTC
 */
export function localToUTC(
  year: number,
  month: number,  // 1-12
  day: number,
  hour: number,
  minute: number,
  timezoneOffset: number  // timezone offset in hours
): Date {
  // Create local time
  const localDate = new Date(year, month - 1, day, hour, minute);
  
  // Subtract timezone offset to get UTC time
  const utcDate = new Date(localDate.getTime() - timezoneOffset * 60 * 60 * 1000);
  
  return utcDate;
}

/**
 * Parse birth date and time
 */
export function parseBirthDateTime(
  dateStr: string,
  timeStr: string,
  timezone: number
): Date {
  // Parse date (YYYY-MM-DD)
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Parse time (HH:MM)
  const [hour, minute] = timeStr.split(':').map(Number);
  
  // Convert to UTC
  return localToUTC(year, month, day, hour, minute, timezone);
}

/**
 * Calculate timezone offset in hours
 */
export function getTimezoneOffset(utcDate: Date, timezone: number): number {
  // Return timezone offset (production environment needs to handle daylight saving time)
  return timezone;
}
