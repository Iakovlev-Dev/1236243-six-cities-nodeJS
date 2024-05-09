export enum UserEnum {
    user = 'user',
    pro = 'pro'
}

export enum CitiesEnum {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf'
}

export enum TypeOfHouseEnum {
    Apartment = 'apartment',
    House = 'house',
    Room = 'room',
    hotel = 'hotel',
}

export enum ExtrasEnum {
    Breakfast = 'Breakfast',
    AirConditioning = 'Air conditioning',
    LaptopFriendlyWorkspace = 'Laptop friendly workspace',
    BabySeat = 'Baby seat',
    Washer = 'Washer',
    Towels = 'Towels',
    Fridge = 'Fridge'
}

export type ExtraType = {
    extra: string
}

export type FotoType = {
    foto: string
}
