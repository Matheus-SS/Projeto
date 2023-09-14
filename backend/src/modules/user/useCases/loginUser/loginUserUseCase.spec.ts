import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@modules/user/useCases/createUser/createUserUsecase';
import { UserRepositoryProvider } from '@modules/user/repository/userRespository.provider';
import { SqliteModule } from '@infra/database/sqlite.module';
import { scriptSql } from '@src/scriptSqlite';
import { FakeHashPassword } from '@modules/user/provider/passwordHash/fakeHash/fakeHash.service';
import { PASSWORD_HASH_PROVIDER } from '@src/constants';
import { SqliteConfig } from '@shared/sqlite.config';
import { sleep } from '@shared/util';
import { SessionRepositoryProvider } from '@modules/session/repository/sessionRepository.provider';
import { LoginUserUseCase } from './loginUserUseCase';
// eslint-disable-next-line @typescript-eslint/no-var-requires
describe('Create User Use Case', () => {
  const sqliteConfig = new SqliteConfig();
  let createUserUsecase: CreateUserUseCase;
  let loginUserUseCase: LoginUserUseCase;
  beforeAll(async () => {
    sqliteConfig.executeScript(scriptSql.CREATE_TABLE_USER);
    sqliteConfig.executeScript(scriptSql.CREATE_TABLE_SESSION);

    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteModule],
      providers: [
        CreateUserUseCase,
        LoginUserUseCase,
        UserRepositoryProvider,
        SessionRepositoryProvider,
        {
          provide: PASSWORD_HASH_PROVIDER,
          useClass: FakeHashPassword,
        },
      ],
    }).compile();

    createUserUsecase = module.get<CreateUserUseCase>(CreateUserUseCase);
    loginUserUseCase = module.get<LoginUserUseCase>(LoginUserUseCase);
    await sleep();
  });
  afterAll(() => {
    sqliteConfig.executeScript(scriptSql.DELETE_TABLE_SESSION);
    sqliteConfig.executeScript(scriptSql.DELETE_TABLE_USER);
  });
  it('Deve se logar', async () => {
    await createUserUsecase.execute({
      email: 'teste@gmail.com',
      password: '123456',
      username: 'teste',
    });

    const result = await loginUserUseCase.execute({
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user.email');
    expect(result).toHaveProperty('user.username');
    expect(result['user']['email']).toBe('teste@gmail.com');
    expect(result['user']['username']).toBe('teste');
  });
});
