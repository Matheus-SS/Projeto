import { DataSource } from 'typeorm';
import { User } from '@infra/database/entity/User.entity';
import { Injectable, DynamicModule } from '@nestjs/common';
import { Session } from '@infra/database/entity/Session.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from '@infra/database/entity/Product.entity';
import { Cart } from '@infra/database/entity/Cart.entity';
import { Log } from '@infra/database/entity/Log.entity';

@Injectable()
export default class TypeOrmSqlLiteDatabase {
  connection: DataSource;
  constructor() {
    this.init();
  }
  public async init(): Promise<void> {
    this.connection = new DataSource({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, Session, Product, Cart, Log],
      namingStrategy: new SnakeNamingStrategy(),
    });

    await this.connection.initialize();
  }
}
