import { Injectable } from '@nestjs/common';
import IoRedis from 'ioredis';
export interface ISession {
  getValue(key: string): Promise<string>;
}
@Injectable()
export class SessionClient extends IoRedis implements ISession {
  constructor() {
    super('redis://localhost:6379');
  }

  public async getValue(key: string): Promise<string> {
    return await this.get(key);
  }
}
