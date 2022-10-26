import { Provider } from '@nestjs/common';
import { USER_REPOSITORY_PROVIDER } from './constants';
import { InMemoryUserRepository } from './inMemory/inMemoryUserRepository';

export const UserRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_PROVIDER,
  useClass: InMemoryUserRepository,
};
