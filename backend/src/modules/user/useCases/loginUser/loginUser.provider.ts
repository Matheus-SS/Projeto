import { Provider } from '@nestjs/common';
import { LOGIN_USER_PROVIDER } from '../../../../constants';
import { LoginUserUseCase } from './loginUserUseCase';

export const LoginUserProvider: Provider = {
  provide: LOGIN_USER_PROVIDER,
  useClass: LoginUserUseCase,
};
