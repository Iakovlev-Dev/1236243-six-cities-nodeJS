
import { FileReader } from './file-reader.interface.js';
import { OfferType } from '../../types/offer.type.js';
import { CitiesEnum, TypeOfHouseEnum, UserEnum } from '../../types/enums.js';
import { CityCoordinate, CityType, CoordinatesType } from '../../types/cities.type.js';
import { UserType } from '../../types/user.type.js';
import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {

  private CHUNK_SIZE = 16384; // 16KB

  constructor (
    private readonly filename: string
  ) {
    super();
  }

  private parseToOffer(line: string): OfferType{
    const [
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}

