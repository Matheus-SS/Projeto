import { UserEntity } from './User';
import { userErrorEnum } from './userError.enum';

test('Deve criar um usuario', () => {
  const user = UserEntity.createUser({
    id: 1,
    username: 'John',
    email: 'jhowan@gmail.com',
    password: 'abc123',
  });

  const userOrFail = user.getValue().getUsername;
  expect(userOrFail.getValue).toBe('John');
});

test('Deve dar erro ao tentar criar usuario com username com menos de 4 letras', () => {
  const user = UserEntity.createUser({
    id: 1,
    username: 'Joh',
    email: 'jhowan@gmail.com',
    password: 'abc123',
  });

  expect(user.failure).toBe(true);
  expect(user.error).toBe(userErrorEnum.USERNAME_MIN_LENGTH);
});

test('Deve dar erro ao tentar criar usuario com senha com menos de 6 letras', () => {
  const user = UserEntity.createUser({
    id: 1,
    username: 'John',
    email: 'jhowan@gmail.com',
    password: 'abc12',
  });

  expect(user.failure).toBe(true);
  expect(user.error).toBe(userErrorEnum.PASSWORD_MIN_LENGTH);
});

test('Deve dar erro ao tentar criar usuario com email inválido', () => {
  const user = UserEntity.createUser({
    id: 1,
    username: 'John',
    email: 'jhowan@gmail.@.com',
    password: 'abc123',
  });

  expect(user.failure).toBe(true);
  expect(user.error).toBe(userErrorEnum.EMAIL_INVALID);
});

test('Deve dar erro ao tentar criar usuario com senha com espaços', () => {
  const user = UserEntity.createUser({
    id: 1,
    username: 'John',
    email: 'jhowan@gmail.@.com',
    password: 'abc 123',
  });

  expect(user.failure).toBe(true);
  expect(user.error).toBe(userErrorEnum.PASSWORD_WHITESPACE);
});
