// import { Test, TestingModule } from '@nestjs/testing';
// import { SqliteModule } from '@infra/database/sqlite.module';
// import { scriptSql } from '@src/scriptSqlite';
// import { SqliteConfig } from '@shared/sqlite.config';
// import { sleep } from '@shared/util';
// import { AddressRepositoryProvider } from '@modules/address/repository/addressRepository.provider';
// import { CreateAddressUseCase } from './createAddressUseCase';
// import { CreateAddress } from '@modules/address/repository/addressRepository.interface';
// import { CreateUserUseCase } from '@modules/user/useCases/createUser/createUserUseCase';
// import { PASSWORD_HASH_PROVIDER } from '@src/constants';
// import { FakeHashPassword } from '@modules/user/provider/passwordHash/fakeHash/fakeHash.service';
// import { UserRepositoryProvider } from '@modules/user/repository/userRespository.provider';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// describe('Create Address Use Case', () => {
//   let createAddressUseCase: CreateAddressUseCase;
//   let createUserUsecase: CreateUserUseCase;
//   const sqliteConfig = new SqliteConfig();
//   beforeAll(async () => {
//     sqliteConfig.executeScript(scriptSql.CREATE_TABLE_USER);
//     sqliteConfig.executeScript(scriptSql.CREATE_TABLE_ADDRESS);

//     const module: TestingModule = await Test.createTestingModule({
//       imports: [SqliteModule],
//       providers: [
//         CreateUserUseCase,
//         CreateAddressUseCase,
//         UserRepositoryProvider,
//         AddressRepositoryProvider,
//         {
//           provide: PASSWORD_HASH_PROVIDER,
//           useClass: FakeHashPassword,
//         },
//       ],
//     }).compile();
//     createAddressUseCase =
//       module.get<CreateAddressUseCase>(CreateAddressUseCase);
//     createUserUsecase = module.get<CreateUserUseCase>(CreateUserUseCase);
//     await sleep();
//   });
//   afterAll(() => {
//     sqliteConfig.executeScript(scriptSql.DELETE_TABLE_ADDRESS);
//     sqliteConfig.executeScript(scriptSql.DELETE_TABLE_USER);
//   });
//   it('Deve criar endereço ', async () => {
//     await createUserUsecase.execute({
//       email: 'teste@gmail.com',
//       password: '123456',
//       username: 'teste',
//     });

//     const input: CreateAddress = {
//       user_id: 1,
//       cep: '26349120',
//       city: 'Rio de janeiro',
//       neighborhood: 'Da graça',
//       uf: 'RJ',
//       complement: 'rua america',
//       public_place: 'casa',
//     };

//     const result = await createAddressUseCase.execute(input);
//     expect(result.success).toBe(true);

//     if (result.success === true) {
//       const expected = {
//         id: 1,
//         user_id: 1,
//         cep: '26349120',
//         public_place: 'casa',
//         complement: 'rua america',
//         neighborhood: 'Da graça',
//         city: 'Rio de janeiro',
//         uf: 'RJ',
//         created_at: result.data.created_at,
//         updated_at: result.data.updated_at,
//         user_username: 'teste',
//         user_email: 'teste@gmail.com',
//         user_created_at: result.data.user_created_at,
//         user_updated_at: result.data.user_updated_at,
//       };
//       expect(result.data).toEqual(expected);
//     }
//   });
// });
