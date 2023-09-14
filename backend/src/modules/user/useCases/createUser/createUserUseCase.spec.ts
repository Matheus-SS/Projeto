import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@modules/user/useCases/createUser/createUserUseCase';
import { UserRepositoryProvider } from '@modules/user/repository/userRespository.provider';
import { SqliteModule } from '@infra/database/sqlite.module';
import { scriptSql } from '@src/scriptSqlite';
import { FakeHashPassword } from '@modules/user/provider/passwordHash/fakeHash/fakeHash.service';
import { PASSWORD_HASH_PROVIDER } from '@src/constants';
import { SqliteConfig } from '@shared/sqlite.config';
import { sleep } from '@shared/util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
describe('Create User Use Case', () => {
  let createUserUsecase: CreateUserUseCase;
  const sqliteConfig = new SqliteConfig();
  beforeAll(async () => {
    sqliteConfig.executeScript(scriptSql.CREATE_TABLE_USER);

    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteModule],
      providers: [
        CreateUserUseCase,
        UserRepositoryProvider,
        {
          provide: PASSWORD_HASH_PROVIDER,
          useClass: FakeHashPassword,
        },
      ],
    }).compile();
    createUserUsecase = module.get<CreateUserUseCase>(CreateUserUseCase);
    await sleep();
  });
  afterAll(() => {
    sqliteConfig.executeScript('DELETE FROM tbl_user');
  });
  it('Deve criar usuário ', async () => {
    const user = await createUserUsecase.execute({
      email: 'teste@gmail.com',
      password: '123456',
      username: 'abcabc',
    });

    expect(user.success).toBe(true);
    if (!user.success) return;
    expect(user.data.email).toBe('teste@gmail.com');
    expect(user.data.username).toBe('abcabc');
  });

  it('Deve dar erro de email já encontrado', async () => {
    await createUserUsecase.execute({
      email: 'teste1@gmail.com',
      password: '123456',
      username: 'abcabc',
    });
    const user = await createUserUsecase.execute({
      email: 'teste1@gmail.com',
      password: '123456',
      username: 'abcabc',
    });

    expect(user.success).toBe(false);
    if (user.success === false) {
      expect(user.error.message).toBe(
        'Esse email teste1@gmail.com já foi cadastrado',
      );
      expect(user.error.name).toBe('EmailAlreadyExistsError');
    }
  });
});
