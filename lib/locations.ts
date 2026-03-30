// 结构化的地区/城市数据
export interface City {
  name: string;
  lat: number;
  lon: number;
  timezone: number;
}

export interface Region {
  name: string;
  cities: City[];
}

export interface Country {
  name: string;
  regions: Region[];
}

export const LOCATIONS: Country[] = [
  // 中国
  {
    name: '中国',
    regions: [
      {
        name: '北京',
        cities: [
          { name: '北京', lat: 39.9042, lon: 116.4074, timezone: 8 }
        ]
      },
      {
        name: '上海',
        cities: [
          { name: '上海', lat: 31.2304, lon: 121.4737, timezone: 8 }
        ]
      },
      {
        name: '广东',
        cities: [
          { name: '广州', lat: 23.1291, lon: 113.2644, timezone: 8 },
          { name: '深圳', lat: 22.5431, lon: 114.0579, timezone: 8 },
          { name: '东莞', lat: 23.0207, lon: 113.7518, timezone: 8 }
        ]
      },
      {
        name: '浙江',
        cities: [
          { name: '杭州', lat: 30.2741, lon: 120.1551, timezone: 8 },
          { name: '宁波', lat: 29.8683, lon: 121.5440, timezone: 8 }
        ]
      },
      {
        name: '江苏',
        cities: [
          { name: '南京', lat: 32.0603, lon: 118.7969, timezone: 8 },
          { name: '苏州', lat: 31.2989, lon: 120.5853, timezone: 8 }
        ]
      },
      {
        name: '四川',
        cities: [
          { name: '成都', lat: 30.5728, lon: 104.0668, timezone: 8 }
        ]
      },
      {
        name: '湖北',
        cities: [
          { name: '武汉', lat: 30.5928, lon: 114.3055, timezone: 8 }
        ]
      },
      {
        name: '陕西',
        cities: [
          { name: '西安', lat: 34.3416, lon: 108.9398, timezone: 8 }
        ]
      },
      {
        name: '香港',
        cities: [
          { name: '香港', lat: 22.3193, lon: 114.1694, timezone: 8 }
        ]
      },
      {
        name: '台湾',
        cities: [
          { name: '台北', lat: 25.0330, lon: 121.5654, timezone: 8 }
        ]
      }
    ]
  },
  // 美国
  {
    name: 'United States',
    regions: [
      {
        name: 'California',
        cities: [
          { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, timezone: -8 },
          { name: 'San Francisco', lat: 37.7749, lon: -122.4194, timezone: -8 },
          { name: 'San Diego', lat: 32.7157, lon: -117.1611, timezone: -8 }
        ]
      },
      {
        name: 'New York',
        cities: [
          { name: 'New York City', lat: 40.7128, lon: -74.0060, timezone: -5 }
        ]
      },
      {
        name: 'Texas',
        cities: [
          { name: 'Houston', lat: 29.7604, lon: -95.3698, timezone: -6 },
          { name: 'Dallas', lat: 32.7767, lon: -96.7970, timezone: -6 },
          { name: 'Austin', lat: 30.2672, lon: -97.7431, timezone: -6 }
        ]
      },
      {
        name: 'Illinois',
        cities: [
          { name: 'Chicago', lat: 41.8781, lon: -87.6298, timezone: -6 }
        ]
      },
      {
        name: 'Washington',
        cities: [
          { name: 'Seattle', lat: 47.6062, lon: -122.3321, timezone: -8 }
        ]
      },
      {
        name: 'Massachusetts',
        cities: [
          { name: 'Boston', lat: 42.3601, lon: -71.0589, timezone: -5 }
        ]
      }
    ]
  },
  // 英国
  {
    name: 'United Kingdom',
    regions: [
      {
        name: 'England',
        cities: [
          { name: 'London', lat: 51.5074, lon: -0.1278, timezone: 0 },
          { name: 'Manchester', lat: 53.4808, lon: -2.2426, timezone: 0 },
          { name: 'Liverpool', lat: 53.4084, lon: -2.9916, timezone: 0 }
        ]
      },
      {
        name: 'Scotland',
        cities: [
          { name: 'Edinburgh', lat: 55.9533, lon: -3.1883, timezone: 0 },
          { name: 'Glasgow', lat: 55.8642, lon: -4.2518, timezone: 0 }
        ]
      }
    ]
  },
  // 日本
  {
    name: '日本',
    regions: [
      {
        name: '東京',
        cities: [
          { name: '東京', lat: 35.6762, lon: 139.6503, timezone: 9 }
        ]
      },
      {
        name: '大阪',
        cities: [
          { name: '大阪', lat: 34.6937, lon: 135.5023, timezone: 9 }
        ]
      },
      {
        name: '京都',
        cities: [
          { name: '京都', lat: 35.0116, lon: 135.7681, timezone: 9 }
        ]
      }
    ]
  },
  // 法国
  {
    name: 'France',
    regions: [
      {
        name: 'Île-de-France',
        cities: [
          { name: 'Paris', lat: 48.8566, lon: 2.3522, timezone: 1 }
        ]
      },
      {
        name: 'Provence-Alpes-Côte d\'Azur',
        cities: [
          { name: 'Marseille', lat: 43.2965, lon: 5.3698, timezone: 1 }
        ]
      }
    ]
  },
  // 德国
  {
    name: 'Germany',
    regions: [
      {
        name: 'Berlin',
        cities: [
          { name: 'Berlin', lat: 52.5200, lon: 13.4050, timezone: 1 }
        ]
      },
      {
        name: 'Bavaria',
        cities: [
          { name: 'Munich', lat: 48.1351, lon: 11.5820, timezone: 1 }
        ]
      }
    ]
  },
  // 澳大利亚
  {
    name: 'Australia',
    regions: [
      {
        name: 'New South Wales',
        cities: [
          { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 11 }
        ]
      },
      {
        name: 'Victoria',
        cities: [
          { name: 'Melbourne', lat: -37.8136, lon: 144.9631, timezone: 11 }
        ]
      }
    ]
  }
];

// 根据选择的城市获取坐标和时区
export function getCityCoords(
  countryName: string,
  regionName: string,
  cityName: string
): City | null {
  const country = LOCATIONS.find(c => c.name === countryName);
  if (!country) return null;
  
  const region = country.regions.find(r => r.name === regionName);
  if (!region) return null;
  
  return region.cities.find(c => c.name === cityName) || null;
}
