import { DataSource } from 'typeorm';
import { User } from './entity/User.entity';
import { Injectable } from '@nestjs/common';
import { Session } from './entity/Session.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from './entity/Product.entity';

@Injectable()
export default class TypeOrmDatabase {
  connection: DataSource;
  constructor() {
    this.init();
  }

  public init(): void {
    this.connection = new DataSource({
      type: 'postgres',
      host: 'containers-us-west-138.railway.app',
      port: 7619,
      username: 'postgres',
      password: 'lplXM9W0o67Uz24HKYel',
      database: 'railway',
      logging: true,
      entities: [User, Session, Product],
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
