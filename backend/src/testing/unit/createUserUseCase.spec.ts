import { CreateUserUseCase } from '@modules/user/useCases/createUser/createUserUsecase';
import { FakeUserRepository } from './fakeUserRepository';
import { FakeHashPassword } from '@modules/user/provider/passwordHash/fakeHash/fakeHash.service';

describe('Validar input de criar usuario', () => {
  let createUserUseCase: CreateUserUseCase;
  beforeEach(async () => {
    createUserUseCase = new CreateUserUseCase(
      new FakeUserRepository(),
      new FakeHashPassword(),
    );
  });

  it('Deve ter todos inputs valido', () => {
    const user = createUserUseCase.validateInput({
      email: 'teste@gmail.com',
      password: '123456',
      username: 'teste',
    });

    expect(user.success).toBe(true);
  });
});
