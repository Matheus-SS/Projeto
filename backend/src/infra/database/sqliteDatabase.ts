import { DataSource } from 'typeorm';
import { User } from './entity/User.entity';
import { Injectable } from '@nestjs/common';
import { Session } from './entity/Session.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from './entity/Product.entity';
import { Cart } from './entity/Cart.entity';
import { Log } from './entity/Log.entity';
import { Address } from './entity/Address.entity';

@Injectable()
export default class SqliteDatabase {
  connection: DataSource;
  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    this.connection = new DataSource({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      logging: true,
      entities: [User, Session, Product, Cart, Log, Address],
      namingStrategy: new SnakeNamingStrategy(),
    });

    await this.connection.initialize();
  }
}
