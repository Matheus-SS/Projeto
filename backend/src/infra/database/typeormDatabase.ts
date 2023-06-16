import { DataSource } from 'typeorm';
import { User } from './entity/User.entity';
import { Injectable } from '@nestjs/common';

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
      entities: [User],
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
