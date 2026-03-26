declare module 'ephemeris' {
  interface PlanetPosition {
    longitude: number;
    latitude: number;
    distance: number;
  }
  
  interface PlanetSpeed {
    longitude: number;
    latitude: number;
    distance: number;
  }
  
  interface PlanetData {
    position: PlanetPosition;
    speed: PlanetSpeed;
  }
  
  interface House {
    position: number;
    sign: number;
  }
  
  interface ChartData {
    sun: PlanetData;
    moon: PlanetData;
    mercury: PlanetData;
    venus: PlanetData;
    mars: PlanetData;
    jupiter: PlanetData;
    saturn: PlanetData;
    uranus: PlanetData;
    neptune: PlanetData;
    pluto: PlanetData;
    northnode: PlanetData;
    chiron: PlanetData;
    houses: House[];
    ascendant: { position: number; sign: number };
    midheaven: { position: number; sign: number };
  }
  
  interface EphemerisOptions {
    houseSystem?: string;
  }
  
  export default function ephemeris(
    date: Date,
    latitude: number,
    longitude: number,
    options?: EphemerisOptions
  ): ChartData;
}