import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@modules/user/useCases/createUser/createUserUsecase';
import { UserRepositoryProvider } from '@modules/user/repository/userRespository.provider';
import { PasswordHashProvider } from '@modules/user/provider/passwordHash/passwordHash.provider';
import { TypeormSqlLiteDatabaseModule } from './typeormSqlLiteDatabase.module';

import { UserRepository } from '@modules/user/repository/userRepository';
import { BcryptHashPassword } from '@modules/user/provider/passwordHash/Bcrypt/bcrypt.service';
import { DataSource } from 'typeorm';
import { User } from '@infra/database/entity/User.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseModule } from '@infra/database/database.module';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { DatabaseProvider } from '@infra/database/database.provider';
import {
  PASSWORD_HASH_PROVIDER,
  USER_REPOSITORY_PROVIDER,
} from '@src/constants';
import { AppModule } from '@src/app.module';
import { UserModule } from '@modules/user/useCases/user.module';
import TypeOrmSqlLiteDatabase from './typeormSqlLiteDatabase';
import { ValidationInputError } from '@shared/validationError';
import { EmailAlreadyExistsError } from '@modules/user/useCases/createUser/createUserError';
import { scriptSql } from '@src/scriptSql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite = require('better-sqlite3');
describe('Create User Use Case', () => {
  let service: CreateUserUseCase;

  beforeAll(async () => {
    const db = sqlite('./database.sqlite', {
      verbose: console.log,
    });

    db.exec(scriptSql);

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeormSqlLiteDatabaseModule],
      providers: [
        CreateUserUseCase,
        UserRepositoryProvider,
        PasswordHashProvider,
      ],
    }).compile();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('ok');
      }, 50);
    });
    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });
  afterAll(() => {
    const db = sqlite('./database.sqlite', {
      verbose: console.log,
    });

    db.exec('DROP TABLE tbl_user');
  });
  it('Create User successfully', async () => {
    const user = await service.execute({
      email: 'teste@gmail.com',
      password: '123456',
      username: 'abcabc',
    });

    if (user instanceof ValidationInputError) {
      throw user;
    }
    if (user instanceof EmailAlreadyExistsError) {
      throw user;
    }
    expect(user.email).toBe('teste@gmail.com');
    expect(user.username).toBe('abcabc');
  });

  it('Throw error if user exists', async () => {
    await service.execute({
      email: 'teste2@gmai.com',
      password: '123456',
      username: 'abc123',
    });

    const user2 = await service.execute({
      email: 'teste2@gmai.com',
      password: '123456',
      username: 'abc123',
    });

    if (user2 instanceof EmailAlreadyExistsError) {
      expect(user2.name).toBe('EmailAlreadyExistsError');
    }
  });
});
