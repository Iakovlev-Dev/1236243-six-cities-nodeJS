import { CitiesEnum } from './enums.js';

export type CoordinatesType = {
    latitude: number;
    longitude: number;
}

export type CityType = {
    name: string;
    coordinates: CoordinatesType
}

export const CityCoordinate: Record<string, CoordinatesType> = {
  [CitiesEnum.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [CitiesEnum.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [CitiesEnum.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [CitiesEnum.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
  [CitiesEnum.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [CitiesEnum.Paris]: { latitude: 48.85661, longitude: 2.351499 }
};
