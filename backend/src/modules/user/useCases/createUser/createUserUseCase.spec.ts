import { FakeHashPassword } from '../../provider/passwordHash/fakeHash/fakeHash.service';
import { InterfacePasswordHash } from '../../provider/passwordHash/passwordHash.interface';
import { InMemoryUserRepository } from '../../repository/inMemory/inMemoryUserRepository';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { CreateUserUseCase } from './createUserUseCase';

let userRepository: InterfaceUserRepository;
let fakeHashProvider: InterfacePasswordHash;
let createUserUseCase: CreateUserUseCase;
describe('Create user usecase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    fakeHashProvider = new FakeHashPassword();
    createUserUseCase = new CreateUserUseCase(userRepository, fakeHashProvider);
  });
  it('Deve criar usuario', async () => {
    const user = await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    });

    if (user.isLeft()) return;

    const expectedResult = {
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    };
    expect(user.value.getProps).toEqual(expectedResult);
  });

  it('Deve dar erro ao tentar criar usuario com mesmo email', async () => {
    await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    });

    const user2 = await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    });

    if (user2.isRight()) return;

    expect(user2.value.name).toBe('EmailAlreadyExistsError');
  });
});
