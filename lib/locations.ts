// 北美地区结构化城市数据
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
  // 美国 - 全部50州 + DC
  {
    name: 'United States',
    regions: [
      {
        name: 'Alabama',
        cities: [
          { name: 'Birmingham', lat: 33.5207, lon: -86.8025, timezone: -6 },
          { name: 'Montgomery', lat: 32.3792, lon: -86.3077, timezone: -6 },
          { name: 'Mobile', lat: 30.6954, lon: -88.0399, timezone: -6 },
          { name: 'Huntsville', lat: 34.7304, lon: -86.5861, timezone: -6 },
          { name: 'Tuscaloosa', lat: 33.2098, lon: -87.5692, timezone: -6 }
        ]
      },
      {
        name: 'Alaska',
        cities: [
          { name: 'Anchorage', lat: 61.2181, lon: -149.9003, timezone: -9 },
          { name: 'Fairbanks', lat: 64.8378, lon: -147.7164, timezone: -9 },
          { name: 'Juneau', lat: 58.3019, lon: -134.4197, timezone: -9 },
          { name: 'Badger', lat: 64.7983, lon: -147.6241, timezone: -9 },
          { name: 'Knik-Fairview', lat: 61.5171, lon: -149.4374, timezone: -9 }
        ]
      },
      {
        name: 'Arizona',
        cities: [
          { name: 'Phoenix', lat: 33.4484, lon: -112.0740, timezone: -7 },
          { name: 'Tucson', lat: 32.2226, lon: -110.9747, timezone: -7 },
          { name: 'Mesa', lat: 33.4152, lon: -111.8315, timezone: -7 },
          { name: 'Chandler', lat: 33.3062, lon: -111.8413, timezone: -7 },
          { name: 'Scottsdale', lat: 33.4942, lon: -111.9261, timezone: -7 },
          { name: 'Glendale', lat: 33.5387, lon: -112.1859, timezone: -7 }
        ]
      },
      {
        name: 'Arkansas',
        cities: [
          { name: 'Little Rock', lat: 34.7465, lon: -92.2896, timezone: -6 },
          { name: 'Fort Smith', lat: 35.3859, lon: -94.3985, timezone: -6 },
          { name: 'Fayetteville', lat: 36.0822, lon: -94.1719, timezone: -6 },
          { name: 'Springdale', lat: 36.1867, lon: -94.2088, timezone: -6 },
          { name: 'Jonesboro', lat: 35.8423, lon: -90.7043, timezone: -6 }
        ]
      },
      {
        name: 'California',
        cities: [
          { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, timezone: -8 },
          { name: 'San Francisco', lat: 37.7749, lon: -122.4194, timezone: -8 },
          { name: 'San Diego', lat: 32.7157, lon: -117.1611, timezone: -8 },
          { name: 'San Jose', lat: 37.3382, lon: -121.8863, timezone: -8 },
          { name: 'Sacramento', lat: 38.5816, lon: -121.4944, timezone: -8 },
          { name: 'Fresno', lat: 36.7378, lon: -119.7871, timezone: -8 },
          { name: 'Oakland', lat: 37.8044, lon: -122.2712, timezone: -8 },
          { name: 'Long Beach', lat: 33.7701, lon: -118.1937, timezone: -8 },
          { name: 'Bakersfield', lat: 35.3733, lon: -119.0187, timezone: -8 },
          { name: 'Anaheim', lat: 33.8366, lon: -117.9143, timezone: -8 },
          { name: 'Santa Ana', lat: 33.7455, lon: -117.8677, timezone: -8 },
          { name: 'Riverside', lat: 33.9806, lon: -117.3755, timezone: -8 },
          { name: 'Irvine', lat: 33.6846, lon: -117.8265, timezone: -8 }
        ]
      },
      {
        name: 'Colorado',
        cities: [
          { name: 'Denver', lat: 39.7392, lon: -104.9903, timezone: -7 },
          { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214, timezone: -7 },
          { name: 'Aurora', lat: 39.7294, lon: -104.8319, timezone: -7 },
          { name: 'Fort Collins', lat: 40.5853, lon: -105.0844, timezone: -7 },
          { name: 'Lakewood', lat: 39.7047, lon: -105.0814, timezone: -7 },
          { name: 'Thornton', lat: 39.8681, lon: -104.9720, timezone: -7 }
        ]
      },
      {
        name: 'Connecticut',
        cities: [
          { name: 'Bridgeport', lat: 41.1865, lon: -73.1952, timezone: -5 },
          { name: 'New Haven', lat: 41.3083, lon: -72.9279, timezone: -5 },
          { name: 'Stamford', lat: 41.0534, lon: -73.5387, timezone: -5 },
          { name: 'Hartford', lat: 41.7658, lon: -72.6734, timezone: -5 },
          { name: 'Waterbury', lat: 41.5582, lon: -73.0515, timezone: -5 }
        ]
      },
      {
        name: 'Delaware',
        cities: [
          { name: 'Wilmington', lat: 39.7391, lon: -75.5398, timezone: -5 },
          { name: 'Dover', lat: 39.1582, lon: -75.5244, timezone: -5 },
          { name: 'Newark', lat: 39.6837, lon: -75.7587, timezone: -5 },
          { name: 'Middletown', lat: 39.4551, lon: -75.6994, timezone: -5 },
          { name: 'Milford', lat: 38.9126, lon: -75.4277, timezone: -5 }
        ]
      },
      {
        name: 'Florida',
        cities: [
          { name: 'Jacksonville', lat: 30.3322, lon: -81.6557, timezone: -5 },
          { name: 'Miami', lat: 25.7617, lon: -80.1918, timezone: -5 },
          { name: 'Tampa', lat: 27.9506, lon: -82.4572, timezone: -5 },
          { name: 'Orlando', lat: 28.5383, lon: -81.3792, timezone: -5 },
          { name: 'St. Petersburg', lat: 27.7676, lon: -82.6403, timezone: -5 },
          { name: 'Hialeah', lat: 25.8576, lon: -80.2781, timezone: -5 },
          { name: 'Tallahassee', lat: 30.4383, lon: -84.2807, timezone: -5 },
          { name: 'Fort Lauderdale', lat: 26.1224, lon: -80.1373, timezone: -5 }
        ]
      },
      {
        name: 'Georgia',
        cities: [
          { name: 'Atlanta', lat: 33.7490, lon: -84.3880, timezone: -5 },
          { name: 'Augusta', lat: 33.4470, lon: -82.0130, timezone: -5 },
          { name: 'Columbus', lat: 32.4610, lon: -84.9877, timezone: -5 },
          { name: 'Savannah', lat: 32.0809, lon: -81.0912, timezone: -5 },
          { name: 'Athens', lat: 33.9519, lon: -83.3576, timezone: -5 }
        ]
      },
      {
        name: 'Hawaii',
        cities: [
          { name: 'Honolulu', lat: 21.3069, lon: -157.8583, timezone: -10 },
          { name: 'Pearl City', lat: 21.4189, lon: -157.9561, timezone: -10 },
          { name: 'Hilo', lat: 19.7297, lon: -155.0900, timezone: -10 },
          { name: 'Kailua', lat: 21.4020, lon: -157.7494, timezone: -10 },
          { name: 'Waipahu', lat: 21.3869, lon: -158.0090, timezone: -10 }
        ]
      },
      {
        name: 'Idaho',
        cities: [
          { name: 'Boise', lat: 43.6150, lon: -116.2023, timezone: -7 },
          { name: 'Meridian', lat: 43.6121, lon: -116.3915, timezone: -7 },
          { name: 'Nampa', lat: 43.5407, lon: -116.5635, timezone: -7 },
          { name: 'Idaho Falls', lat: 43.4666, lon: -112.0347, timezone: -7 },
          { name: 'Pocatello', lat: 42.8713, lon: -112.4445, timezone: -7 }
        ]
      },
      {
        name: 'Illinois',
        cities: [
          { name: 'Chicago', lat: 41.8781, lon: -87.6298, timezone: -6 },
          { name: 'Aurora', lat: 41.7606, lon: -88.3201, timezone: -6 },
          { name: 'Naperville', lat: 41.7508, lon: -88.1535, timezone: -6 },
          { name: 'Joliet', lat: 41.5250, lon: -88.0817, timezone: -6 },
          { name: 'Rockford', lat: 42.2711, lon: -89.0940, timezone: -6 },
          { name: 'Springfield', lat: 39.7817, lon: -89.6501, timezone: -6 }
        ]
      },
      {
        name: 'Indiana',
        cities: [
          { name: 'Indianapolis', lat: 39.7684, lon: -86.1581, timezone: -5 },
          { name: 'Fort Wayne', lat: 41.0793, lon: -85.1394, timezone: -5 },
          { name: 'Evansville', lat: 37.9716, lon: -87.5712, timezone: -6 },
          { name: 'Carmel', lat: 39.9784, lon: -86.1180, timezone: -5 },
          { name: 'South Bend', lat: 41.6764, lon: -86.2550, timezone: -5 }
        ]
      },
      {
        name: 'Iowa',
        cities: [
          { name: 'Des Moines', lat: 41.5868, lon: -93.6250, timezone: -6 },
          { name: 'Cedar Rapids', lat: 41.9779, lon: -91.6656, timezone: -6 },
          { name: 'Davenport', lat: 41.5236, lon: -90.5776, timezone: -6 },
          { name: 'Sioux City', lat: 42.4964, lon: -96.4050, timezone: -6 },
          { name: 'Iowa City', lat: 41.6611, lon: -91.5302, timezone: -6 }
        ]
      },
      {
        name: 'Kansas',
        cities: [
          { name: 'Wichita', lat: 37.6872, lon: -97.3301, timezone: -6 },
          { name: 'Overland Park', lat: 38.9822, lon: -94.6707, timezone: -6 },
          { name: 'Kansas City', lat: 39.0997, lon: -94.5786, timezone: -6 },
          { name: 'Olathe', lat: 38.8814, lon: -94.8191, timezone: -6 },
          { name: 'Topeka', lat: 39.0558, lon: -95.6890, timezone: -6 }
        ]
      },
      {
        name: 'Kentucky',
        cities: [
          { name: 'Louisville', lat: 38.2527, lon: -85.7585, timezone: -5 },
          { name: 'Lexington', lat: 38.0406, lon: -84.5037, timezone: -5 },
          { name: 'Bowling Green', lat: 36.9685, lon: -86.4806, timezone: -6 },
          { name: 'Owensboro', lat: 37.7719, lon: -87.1132, timezone: -6 },
          { name: 'Covington', lat: 39.0836, lon: -84.5086, timezone: -5 }
        ]
      },
      {
        name: 'Louisiana',
        cities: [
          { name: 'New Orleans', lat: 29.9511, lon: -90.0715, timezone: -6 },
          { name: 'Baton Rouge', lat: 30.4515, lon: -91.1871, timezone: -6 },
          { name: 'Shreveport', lat: 32.5252, lon: -93.7502, timezone: -6 },
          { name: 'Lafayette', lat: 30.2241, lon: -92.0198, timezone: -6 },
          { name: 'Lake Charles', lat: 30.2266, lon: -93.2174, timezone: -6 }
        ]
      },
      {
        name: 'Maine',
        cities: [
          { name: 'Portland', lat: 43.6591, lon: -70.2568, timezone: -5 },
          { name: 'Lewiston', lat: 44.1025, lon: -70.1847, timezone: -5 },
          { name: 'Bangor', lat: 44.8012, lon: -68.7704, timezone: -5 },
          { name: 'South Portland', lat: 43.6415, lon: -70.2409, timezone: -5 },
          { name: 'Auburn', lat: 44.0893, lon: -70.2414, timezone: -5 }
        ]
      },
      {
        name: 'Maryland',
        cities: [
          { name: 'Baltimore', lat: 39.2904, lon: -76.6122, timezone: -5 },
          { name: 'Frederick', lat: 39.4143, lon: -77.4105, timezone: -5 },
          { name: 'Rockville', lat: 39.0840, lon: -77.1528, timezone: -5 },
          { name: 'Gaithersburg', lat: 39.1434, lon: -77.2014, timezone: -5 },
          { name: 'Annapolis', lat: 38.9784, lon: -76.4922, timezone: -5 }
        ]
      },
      {
        name: 'Massachusetts',
        cities: [
          { name: 'Boston', lat: 42.3601, lon: -71.0589, timezone: -5 },
          { name: 'Worcester', lat: 42.2626, lon: -71.8023, timezone: -5 },
          { name: 'Springfield', lat: 42.1015, lon: -72.5898, timezone: -5 },
          { name: 'Cambridge', lat: 42.3736, lon: -71.1097, timezone: -5 },
          { name: 'Lowell', lat: 42.6334, lon: -71.3162, timezone: -5 }
        ]
      },
      {
        name: 'Michigan',
        cities: [
          { name: 'Detroit', lat: 42.3314, lon: -83.0458, timezone: -5 },
          { name: 'Grand Rapids', lat: 42.9634, lon: -85.6681, timezone: -5 },
          { name: 'Warren', lat: 42.4775, lon: -83.0277, timezone: -5 },
          { name: 'Sterling Heights', lat: 42.5803, lon: -83.0302, timezone: -5 },
          { name: 'Ann Arbor', lat: 42.2808, lon: -83.7430, timezone: -5 },
          { name: 'Lansing', lat: 42.7325, lon: -84.5555, timezone: -5 }
        ]
      },
      {
        name: 'Minnesota',
        cities: [
          { name: 'Minneapolis', lat: 44.9778, lon: -93.2650, timezone: -6 },
          { name: 'Saint Paul', lat: 44.9537, lon: -93.0900, timezone: -6 },
          { name: 'Rochester', lat: 44.0121, lon: -92.4802, timezone: -6 },
          { name: 'Duluth', lat: 46.7867, lon: -92.1005, timezone: -6 },
          { name: 'Bloomington', lat: 44.8408, lon: -93.3477, timezone: -6 }
        ]
      },
      {
        name: 'Mississippi',
        cities: [
          { name: 'Jackson', lat: 32.2988, lon: -90.1848, timezone: -6 },
          { name: 'Gulfport', lat: 30.3674, lon: -89.0928, timezone: -6 },
          { name: 'Southaven', lat: 34.9888, lon: -90.0076, timezone: -6 },
          { name: 'Hattiesburg', lat: 31.3271, lon: -89.2902, timezone: -6 },
          { name: 'Biloxi', lat: 30.3960, lon: -88.8853, timezone: -6 }
        ]
      },
      {
        name: 'Missouri',
        cities: [
          { name: 'Kansas City', lat: 39.0997, lon: -94.5786, timezone: -6 },
          { name: 'St. Louis', lat: 38.6270, lon: -90.1994, timezone: -6 },
          { name: 'Springfield', lat: 37.2090, lon: -93.2923, timezone: -6 },
          { name: 'Columbia', lat: 38.9517, lon: -92.3341, timezone: -6 },
          { name: 'Jefferson City', lat: 38.5767, lon: -92.1735, timezone: -6 }
        ]
      },
      {
        name: 'Montana',
        cities: [
          { name: 'Billings', lat: 45.7833, lon: -108.5007, timezone: -7 },
          { name: 'Missoula', lat: 46.8721, lon: -113.9940, timezone: -7 },
          { name: 'Great Falls', lat: 47.5002, lon: -111.3008, timezone: -7 },
          { name: 'Bozeman', lat: 45.6770, lon: -111.0429, timezone: -7 },
          { name: 'Butte', lat: 46.0033, lon: -112.5344, timezone: -7 }
        ]
      },
      {
        name: 'Nebraska',
        cities: [
          { name: 'Omaha', lat: 41.2565, lon: -95.9345, timezone: -6 },
          { name: 'Lincoln', lat: 40.8136, lon: -96.7026, timezone: -6 },
          { name: 'Bellevue', lat: 41.1550, lon: -95.9178, timezone: -6 },
          { name: 'Grand Island', lat: 40.9236, lon: -98.3426, timezone: -6 }
        ]
      },
      {
        name: 'Nevada',
        cities: [
          { name: 'Las Vegas', lat: 36.1699, lon: -115.1398, timezone: -8 },
          { name: 'Henderson', lat: 36.0395, lon: -114.9817, timezone: -8 },
          { name: 'Reno', lat: 39.5296, lon: -119.8138, timezone: -8 },
          { name: 'North Las Vegas', lat: 36.1989, lon: -115.1175, timezone: -8 },
          { name: 'Sparks', lat: 39.5349, lon: -119.7477, timezone: -8 }
        ]
      },
      {
        name: 'New Hampshire',
        cities: [
          { name: 'Manchester', lat: 42.9956, lon: -71.4548, timezone: -5 },
          { name: 'Nashua', lat: 42.7654, lon: -71.4676, timezone: -5 },
          { name: 'Concord', lat: 43.2081, lon: -71.5376, timezone: -5 },
          { name: 'Dover', lat: 43.1895, lon: -70.8749, timezone: -5 },
          { name: 'Rochester', lat: 43.3045, lon: -70.9782, timezone: -5 }
        ]
      },
      {
        name: 'New Jersey',
        cities: [
          { name: 'Newark', lat: 40.7357, lon: -74.1724, timezone: -5 },
          { name: 'Jersey City', lat: 40.7178, lon: -74.0431, timezone: -5 },
          { name: 'Paterson', lat: 40.9168, lon: -74.1718, timezone: -5 },
          { name: 'Elizabeth', lat: 40.6639, lon: -74.2107, timezone: -5 },
          { name: 'Trenton', lat: 40.2171, lon: -74.7597, timezone: -5 },
          { name: 'Camden', lat: 39.9256, lon: -75.1196, timezone: -5 }
        ]
      },
      {
        name: 'New Mexico',
        cities: [
          { name: 'Albuquerque', lat: 35.0844, lon: -106.6504, timezone: -7 },
          { name: 'Las Cruces', lat: 32.3199, lon: -106.7637, timezone: -7 },
          { name: 'Rio Rancho', lat: 35.2328, lon: -106.6630, timezone: -7 },
          { name: 'Santa Fe', lat: 35.6870, lon: -105.9378, timezone: -7 },
          { name: 'Roswell', lat: 33.3942, lon: -104.5230, timezone: -7 }
        ]
      },
      {
        name: 'New York',
        cities: [
          { name: 'New York City', lat: 40.7128, lon: -74.0060, timezone: -5 },
          { name: 'Buffalo', lat: 42.8864, lon: -78.8784, timezone: -5 },
          { name: 'Rochester', lat: 43.1566, lon: -77.6088, timezone: -5 },
          { name: 'Yonkers', lat: 40.9312, lon: -73.8987, timezone: -5 },
          { name: 'Syracuse', lat: 43.0481, lon: -76.1474, timezone: -5 },
          { name: 'Albany', lat: 42.6526, lon: -73.7562, timezone: -5 }
        ]
      },
      {
        name: 'North Carolina',
        cities: [
          { name: 'Charlotte', lat: 35.2271, lon: -80.8431, timezone: -5 },
          { name: 'Raleigh', lat: 35.7796, lon: -78.6382, timezone: -5 },
          { name: 'Greensboro', lat: 36.0726, lon: -79.7920, timezone: -5 },
          { name: 'Durham', lat: 35.9940, lon: -78.8986, timezone: -5 },
          { name: 'Winston-Salem', lat: 36.0999, lon: -80.2442, timezone: -5 },
          { name: 'Fayetteville', lat: 35.0527, lon: -78.8784, timezone: -5 }
        ]
      },
      {
        name: 'North Dakota',
        cities: [
          { name: 'Fargo', lat: 46.8772, lon: -96.7898, timezone: -6 },
          { name: 'Bismarck', lat: 46.8083, lon: -100.7837, timezone: -6 },
          { name: 'Grand Forks', lat: 47.9253, lon: -97.0329, timezone: -6 },
          { name: 'Minot', lat: 48.2389, lon: -101.2963, timezone: -6 },
          { name: 'West Fargo', lat: 46.8560, lon: -96.8995, timezone: -6 }
        ]
      },
      {
        name: 'Ohio',
        cities: [
          { name: 'Columbus', lat: 39.9612, lon: -82.9988, timezone: -5 },
          { name: 'Cleveland', lat: 41.4993, lon: -81.6944, timezone: -5 },
          { name: 'Cincinnati', lat: 39.1031, lon: -84.5120, timezone: -5 },
          { name: 'Toledo', lat: 41.6528, lon: -83.5379, timezone: -5 },
          { name: 'Akron', lat: 41.0762, lon: -81.5384, timezone: -5 },
          { name: 'Dayton', lat: 39.7589, lon: -84.1916, timezone: -5 }
        ]
      },
      {
        name: 'Oklahoma',
        cities: [
          { name: 'Oklahoma City', lat: 35.4676, lon: -97.5164, timezone: -6 },
          { name: 'Tulsa', lat: 36.1540, lon: -95.9928, timezone: -6 },
          { name: 'Norman', lat: 35.2226, lon: -97.4395, timezone: -6 },
          { name: 'Broken Arrow', lat: 36.0529, lon: -95.7809, timezone: -6 },
          { name: 'Lawton', lat: 34.6171, lon: -98.3953, timezone: -6 }
        ]
      },
      {
        name: 'Oregon',
        cities: [
          { name: 'Portland', lat: 45.5152, lon: -122.6784, timezone: -8 },
          { name: 'Eugene', lat: 44.0521, lon: -123.0868, timezone: -8 },
          { name: 'Salem', lat: 44.9429, lon: -123.0351, timezone: -8 },
          { name: 'Gresham', lat: 45.5001, lon: -122.4307, timezone: -8 },
          { name: 'Hillsboro', lat: 45.5229, lon: -122.9898, timezone: -8 }
        ]
      },
      {
        name: 'Pennsylvania',
        cities: [
          { name: 'Philadelphia', lat: 39.9526, lon: -75.1652, timezone: -5 },
          { name: 'Pittsburgh', lat: 40.4406, lon: -79.9959, timezone: -5 },
          { name: 'Allentown', lat: 40.6084, lon: -75.4902, timezone: -5 },
          { name: 'Erie', lat: 42.1292, lon: -80.0851, timezone: -5 },
          { name: 'Reading', lat: 40.3356, lon: -75.9270, timezone: -5 }
        ]
      },
      {
        name: 'Rhode Island',
        cities: [
          { name: 'Providence', lat: 41.8240, lon: -71.4128, timezone: -5 },
          { name: 'Warwick', lat: 41.7021, lon: -71.4162, timezone: -5 },
          { name: 'Cranston', lat: 41.7798, lon: -71.4373, timezone: -5 },
          { name: 'Pawtucket', lat: 41.8787, lon: -71.3826, timezone: -5 },
          { name: 'East Providence', lat: 41.8137, lon: -71.3662, timezone: -5 }
        ]
      },
      {
        name: 'South Carolina',
        cities: [
          { name: 'Charleston', lat: 32.7765, lon: -79.9311, timezone: -5 },
          { name: 'Columbia', lat: 34.0007, lon: -81.0348, timezone: -5 },
          { name: 'North Charleston', lat: 32.8546, lon: -79.9748, timezone: -5 },
          { name: 'Mount Pleasant', lat: 32.8328, lon: -79.8282, timezone: -5 },
          { name: 'Greenville', lat: 34.8526, lon: -82.3940, timezone: -5 }
        ]
      },
      {
        name: 'South Dakota',
        cities: [
          { name: 'Sioux Falls', lat: 43.5460, lon: -96.7313, timezone: -6 },
          { name: 'Rapid City', lat: 44.0805, lon: -103.2310, timezone: -7 },
          { name: 'Aberdeen', lat: 45.4650, lon: -98.4865, timezone: -6 },
          { name: 'Brookings', lat: 44.3044, lon: -96.7981, timezone: -6 },
          { name: 'Watertown', lat: 44.8994, lon: -97.1150, timezone: -6 }
        ]
      },
      {
        name: 'Tennessee',
        cities: [
          { name: 'Nashville', lat: 36.1627, lon: -86.7816, timezone: -6 },
          { name: 'Memphis', lat: 35.1495, lon: -90.0490, timezone: -6 },
          { name: 'Knoxville', lat: 35.9606, lon: -83.9207, timezone: -5 },
          { name: 'Chattanooga', lat: 35.0456, lon: -85.3097, timezone: -5 },
          { name: 'Clarksville', lat: 36.5298, lon: -87.3595, timezone: -6 }
        ]
      },
      {
        name: 'Texas',
        cities: [
          { name: 'Houston', lat: 29.7604, lon: -95.3698, timezone: -6 },
          { name: 'San Antonio', lat: 29.4241, lon: -98.4936, timezone: -6 },
          { name: 'Dallas', lat: 32.7767, lon: -96.7970, timezone: -6 },
          { name: 'Austin', lat: 30.2672, lon: -97.7431, timezone: -6 },
          { name: 'Fort Worth', lat: 32.7555, lon: -97.3308, timezone: -6 },
          { name: 'El Paso', lat: 31.7619, lon: -106.4850, timezone: -6 },
          { name: 'Arlington', lat: 32.7357, lon: -97.1081, timezone: -6 },
          { name: 'Corpus Christi', lat: 27.8006, lon: -97.3964, timezone: -6 },
          { name: 'Plano', lat: 33.0198, lon: -96.6989, timezone: -6 },
          { name: 'Lubbock', lat: 33.5779, lon: -101.8552, timezone: -6 }
        ]
      },
      {
        name: 'Utah',
        cities: [
          { name: 'Salt Lake City', lat: 40.7608, lon: -111.8910, timezone: -7 },
          { name: 'West Valley City', lat: 40.6916, lon: -112.0011, timezone: -7 },
          { name: 'Provo', lat: 40.2338, lon: -111.6585, timezone: -7 },
          { name: 'West Jordan', lat: 40.6097, lon: -111.9391, timezone: -7 },
          { name: 'St. George', lat: 37.0834, lon: -113.5843, timezone: -7 }
        ]
      },
      {
        name: 'Vermont',
        cities: [
          { name: 'Burlington', lat: 44.4759, lon: -73.2120, timezone: -5 },
          { name: 'South Burlington', lat: 44.4639, lon: -73.1709, timezone: -5 },
          { name: 'Rutland', lat: 43.6106, lon: -72.9726, timezone: -5 },
          { name: 'Barre', lat: 44.1970, lon: -72.5018, timezone: -5 },
          { name: 'Montpelier', lat: 44.2601, lon: -72.5754, timezone: -5 }
        ]
      },
      {
        name: 'Virginia',
        cities: [
          { name: 'Virginia Beach', lat: 36.8529, lon: -75.9780, timezone: -5 },
          { name: 'Norfolk', lat: 36.8468, lon: -76.2852, timezone: -5 },
          { name: 'Chesapeake', lat: 36.6808, lon: -76.3019, timezone: -5 },
          { name: 'Richmond', lat: 37.5407, lon: -77.4360, timezone: -5 },
          { name: 'Newport News', lat: 37.0871, lon: -76.4730, timezone: -5 },
          { name: 'Alexandria', lat: 38.8048, lon: -77.0469, timezone: -5 },
          { name: 'Hampton', lat: 37.0299, lon: -76.3452, timezone: -5 },
          { name: 'Arlington', lat: 38.8816, lon: -77.1040, timezone: -5 }
        ]
      },
      {
        name: 'Washington',
        cities: [
          { name: 'Seattle', lat: 47.6062, lon: -122.3321, timezone: -8 },
          { name: 'Spokane', lat: 47.6588, lon: -117.4260, timezone: -8 },
          { name: 'Tacoma', lat: 47.2529, lon: -122.4443, timezone: -8 },
          { name: 'Vancouver', lat: 45.6387, lon: -122.6615, timezone: -8 },
          { name: 'Bellevue', lat: 47.6101, lon: -122.2015, timezone: -8 }
        ]
      },
      {
        name: 'West Virginia',
        cities: [
          { name: 'Charleston', lat: 38.3498, lon: -81.6326, timezone: -5 },
          { name: 'Huntington', lat: 38.4192, lon: -82.4452, timezone: -5 },
          { name: 'Morgantown', lat: 39.6295, lon: -79.9559, timezone: -5 },
          { name: 'Parkersburg', lat: 39.2667, lon: -81.5617, timezone: -5 },
          { name: 'Wheeling', lat: 40.0640, lon: -80.7209, timezone: -5 }
        ]
      },
      {
        name: 'Wisconsin',
        cities: [
          { name: 'Milwaukee', lat: 43.0389, lon: -87.9065, timezone: -6 },
          { name: 'Madison', lat: 43.0731, lon: -89.4012, timezone: -6 },
          { name: 'Green Bay', lat: 44.5133, lon: -88.0133, timezone: -6 },
          { name: 'Kenosha', lat: 42.5847, lon: -87.8212, timezone: -6 },
          { name: 'Racine', lat: 42.7261, lon: -87.7823, timezone: -6 }
        ]
      },
      {
        name: 'Wyoming',
        cities: [
          { name: 'Cheyenne', lat: 41.1400, lon: -104.8202, timezone: -7 },
          { name: 'Casper', lat: 42.8666, lon: -106.3131, timezone: -7 },
          { name: 'Laramie', lat: 41.3114, lon: -105.5911, timezone: -7 },
          { name: 'Gillette', lat: 44.2911, lon: -105.5022, timezone: -7 },
          { name: 'Rock Springs', lat: 41.5875, lon: -109.2029, timezone: -7 }
        ]
      }
    ]
  },
  // 加拿大
  {
    name: 'Canada',
    regions: [
      {
        name: 'Ontario',
        cities: [
          { name: 'Toronto', lat: 43.6532, lon: -79.3832, timezone: -5 },
          { name: 'Ottawa', lat: 45.4215, lon: -75.6972, timezone: -5 },
          { name: 'Hamilton', lat: 43.2552, lon: -79.8438, timezone: -5 },
          { name: 'Mississauga', lat: 43.5890, lon: -79.6441, timezone: -5 },
          { name: 'Brampton', lat: 43.7315, lon: -79.7624, timezone: -5 },
          { name: 'London', lat: 42.9849, lon: -81.2453, timezone: -5 },
          { name: 'Markham', lat: 43.8561, lon: -79.3370, timezone: -5 },
          { name: 'Kitchener', lat: 43.4501, lon: -80.4900, timezone: -5 }
        ]
      },
      {
        name: 'Quebec',
        cities: [
          { name: 'Montreal', lat: 45.5017, lon: -73.5673, timezone: -5 },
          { name: 'Quebec City', lat: 46.8139, lon: -71.2080, timezone: -5 },
          { name: 'Laval', lat: 45.5580, lon: -73.6920, timezone: -5 },
          { name: 'Gatineau', lat: 45.4778, lon: -75.7016, timezone: -5 },
          { name: 'Sherbrooke', lat: 45.4035, lon: -71.8027, timezone: -5 }
        ]
      },
      {
        name: 'British Columbia',
        cities: [
          { name: 'Vancouver', lat: 49.2827, lon: -123.1207, timezone: -8 },
          { name: 'Surrey', lat: 49.1044, lon: -122.8011, timezone: -8 },
          { name: 'Burnaby', lat: 49.2679, lon: -122.9693, timezone: -8 },
          { name: 'Richmond', lat: 49.1666, lon: -123.1336, timezone: -8 },
          { name: 'Abbotsford', lat: 49.0500, lon: -122.3045, timezone: -8 },
          { name: 'Kelowna', lat: 49.8880, lon: -119.4956, timezone: -8 },
          { name: 'Victoria', lat: 48.4290, lon: -123.3644, timezone: -8 }
        ]
      },
      {
        name: 'Alberta',
        cities: [
          { name: 'Calgary', lat: 51.0447, lon: -114.0719, timezone: -7 },
          { name: 'Edmonton', lat: 53.5461, lon: -113.4938, timezone: -7 },
          { name: 'Red Deer', lat: 52.2691, lon: -113.8228, timezone: -7 },
          { name: 'Lethbridge', lat: 49.6935, lon: -112.8419, timezone: -7 },
          { name: 'Grande Prairie', lat: 55.1710, lon: -118.7930, timezone: -7 }
        ]
      },
      {
        name: 'Manitoba',
        cities: [
          { name: 'Winnipeg', lat: 49.8951, lon: -97.1384, timezone: -6 },
          { name: 'Brandon', lat: 49.8469, lon: -99.9531, timezone: -6 },
          { name: 'Steinbach', lat: 49.5259, lon: -96.6846, timezone: -6 }
        ]
      },
      {
        name: 'Nova Scotia',
        cities: [
          { name: 'Halifax', lat: 44.6488, lon: -63.5752, timezone: -4 },
          { name: 'Sydney', lat: 46.1365, lon: -60.1831, timezone: -4 },
          { name: 'Dartmouth', lat: 44.6700, lon: -63.5771, timezone: -4 }
        ]
      },
      {
        name: 'Saskatchewan',
        cities: [
          { name: 'Saskatoon', lat: 52.1332, lon: -106.6700, timezone: -6 },
          { name: 'Regina', lat: 50.4452, lon: -104.6189, timezone: -6 },
          { name: 'Prince Albert', lat: 53.2001, lon: -105.7500, timezone: -6 }
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
