import * as Mongoose from 'mongoose';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import { setTimeout } from 'node:timers/promises';
import {Logger} from '../logger/index.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class DatabaseClientMongo {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase () {
    return this.isConnected;
  }

  public async connect (uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB is already connected');
    }

    this.logger.info('Trying to connect to Database');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;

        this.logger.info('Database Connected');
        return;
      } catch (err) {
        attempt++;
        this.logger.error('Failed to connect to Database', err as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  public async disconnect (): Promise<void> {
    if(!this.isConnectedToDatabase()) {
      throw new Error('Not connected to Database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database Disconnected');
  }
}
