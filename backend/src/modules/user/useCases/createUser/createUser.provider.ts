import { Provider } from '@nestjs/common';
import { CREATE_USER_PROVIDER } from '../../../../constants';
import { CreateUserUseCase } from './createUserUseCase';

export const CreateUserProvider: Provider = {
  provide: CREATE_USER_PROVIDER,
  useClass: CreateUserUseCase,
};
