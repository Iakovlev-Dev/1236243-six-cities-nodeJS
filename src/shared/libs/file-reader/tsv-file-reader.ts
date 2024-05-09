import { readFileSync } from 'node:fs';
import { CityCoordinate, CityType, CoordinatesType } from '../../types/city.type.js';
import { CitiesEnum, TypeOfHouseEnum, UserEnum } from '../../types/enums.js';
import { OfferType } from '../../types/offer.type.js';
import { UserType } from '../../types/user.type.js';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';
  constructor(
        private readonly filename: string
  ) {}

  private validateRawData(): void {
    if(!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseToOffer(line));
  }

  private parseToOffer(line: string): OfferType {
    const [
      id,
      name,
      description,
      date,
      city,
      prevFoto,
      foto,
      isPremium,
      isFavorites,
      rating,
      type,
      rooms,
      guests,
      price,
      extras,
      userName,
      email,
      avatar,
      password,
      userType,
      comments,
      coords
    ] = line.split('\t');

    return {
      id,
      name,
      description,
      date: new Date(date),
      city: this.parseCity(city),
      prevFoto,
      foto: this.parseFoto(foto),
      isPremium: !!isPremium,
      isFavorites: !!isFavorites,
      rating: parseFloat(rating),
      type: type as TypeOfHouseEnum,
      rooms: parseFloat(rooms),
      guests: parseFloat(guests),
      price: parseFloat(price),
      extras: this.parseExtras(extras),
      user: this.parseUserInfo(userName, email, avatar, password,userType),
      comments: parseFloat(comments),
      coords: this.parseCoords(coords)
    };
  }

  private parseCity(city: string): CityType {
    if(Object.keys(CitiesEnum).includes(city)) {
      return {
        name: city,
        coordinates: CityCoordinate[city]
      };
    }
    return {
      name: city,
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  private parseFoto(fotos: string): {foto: string}[] {
    return fotos.split(';').map((foto) => ({foto}));
  }

  private parseExtras(extras: string): {extra: string}[] {
    return extras.split(';').map((extra) => ({extra}));
  }

  private parseUserInfo(userName: string, email: string, avatar: string,password: string, userType: string): UserType {
    return {
      name: userName,
      email: email,
      avatar: avatar,
      password: password,
      type: userType as UserEnum
    };
  }

  private parseCoords(coords: string): CoordinatesType {
    const [latitude, longitude] = coords.split(';');
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): OfferType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
