import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from './createUserUseCase';
import { CREATE_USER_USE_CASE_PROVIDER } from '@src/constants';

export const CreateUserUseCaseProvider: Provider = {
  provide: CREATE_USER_USE_CASE_PROVIDER,
  useClass: CreateUserUseCase,
};
