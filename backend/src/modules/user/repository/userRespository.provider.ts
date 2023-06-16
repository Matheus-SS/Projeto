import { Provider } from '@nestjs/common';
import { USER_REPOSITORY_PROVIDER } from '@src/constants';
import { UserRepository } from './userRepository';

export const UserRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_PROVIDER,
  useClass: UserRepository,
};
