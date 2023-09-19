import { DataSource } from 'typeorm';
import { User } from './entity/User.entity';
import { Injectable } from '@nestjs/common';
import { Session } from './entity/Session.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from './entity/Product.entity';
import { Cart } from './entity/Cart.entity';
import { Log } from './entity/Log.entity';
import { Address } from './entity/Address.entity';
import { config } from '@shared/config';

@Injectable()
export default class TypeOrmDatabase {
  connection: DataSource;
  constructor() {
    this.init();
  }

  public init(): void {
    this.connection = new DataSource({
      type: 'postgres',
      host: config.DATABASE_HOST,
      port: 5432,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE,
      logging: true,
      entities: [User, Session, Product, Cart, Log, Address],
      namingStrategy: new SnakeNamingStrategy(),
    });

    this.connection
      .initialize()
      .then(() => {
        console.log('CONEXAO COM O BANCO FEITA COM SUCESSO');
      })
      .catch((error) => {
        console.error('ERRO CONEXAO COM O BANCO', error);
      });
  }
}
