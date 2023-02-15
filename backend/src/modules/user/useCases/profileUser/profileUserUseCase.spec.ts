import { InMemoryUserRepository } from '../../repository/inMemory/inMemoryUserRepository';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { InterfacePasswordHash } from '../../provider/passwordHash/passwordHash.interface';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { ProfileUserUseCase } from './profileUserUseCase';
import { FakeHashPassword } from '../../provider/passwordHash/fakeHash/fakeHash.service';

let userRepository: InterfaceUserRepository;
let profileUserUseCase: ProfileUserUseCase;
let createUserUseCase: CreateUserUseCase;
let fakeHashProvider: InterfacePasswordHash;

describe('Profile user usecase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    fakeHashProvider = new FakeHashPassword();
    createUserUseCase = new CreateUserUseCase(userRepository, fakeHashProvider);
    profileUserUseCase = new ProfileUserUseCase(userRepository);
  });

  it('Deve retornar o usuário', async () => {
    await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
      username: 'user_example',
    });

    const userProfile = await profileUserUseCase.execute('user@example.com');

    if (userProfile.isRight()) {
      expect(userProfile.value.email).toEqual('user@example.com');
      expect(userProfile.value.username).toEqual('user_example');
    }
  });

  it('Deve retornar erro de usuário não encontrado', async () => {
    const userProfile = await profileUserUseCase.execute('user@example.com');

    if (userProfile.isLeft()) {
      expect(userProfile.value.name).toBe('ProfileNotFoundError');
    }
  });
});
