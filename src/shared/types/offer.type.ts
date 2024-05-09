import { CityType, CoordinatesType } from './city.type.js';
import { ExtraType, FotoType, TypeOfHouseEnum } from './enums.js';
import { UserType } from './user.type.js';

export type OfferType = {
    id: string;
    name: string;
    description: string;
    date: Date;
    city: CityType;
    prevFoto: string;
    foto: FotoType[];
    isPremium: boolean;
    isFavorites: boolean;
    rating: number;
    type: TypeOfHouseEnum;
    rooms: number;
    guests: number;
    price: number;
    extras: ExtraType[];
    user: UserType;
    comments: number;
    coords: CoordinatesType;
}
