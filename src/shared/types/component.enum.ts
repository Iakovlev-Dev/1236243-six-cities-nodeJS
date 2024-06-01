export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),

  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),

  LocationService: Symbol.for('LocationService'),
  LocationModel: Symbol.for('LocationModel'),

  CityService: Symbol.for('CityService'),
  CityModel: Symbol.for('CityModel'),

} as const;
