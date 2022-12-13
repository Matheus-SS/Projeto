import { FakeHashPassword } from '../../provider/passwordHash/fakeHash/fakeHash.service';
import { InterfacePasswordHash } from '../../provider/passwordHash/passwordHash.interface';
import { InMemoryUserRepository } from '../../repository/inMemory/inMemoryUserRepository';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { LoginUserUseCase } from './loginUserUseCase';

let userRepository: InterfaceUserRepository;
let fakeHashProvider: InterfacePasswordHash;
let loginUserUseCase: LoginUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe('Create user usecase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    fakeHashProvider = new FakeHashPassword();
    loginUserUseCase = new LoginUserUseCase(userRepository, fakeHashProvider);
    createUserUseCase = new CreateUserUseCase(userRepository, fakeHashProvider);
  });
  it('Deve logar um usuario', async () => {
    await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    });
    const userlogged = await loginUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
    });

    expect(userlogged.value).toEqual('logged in');
  });
});
