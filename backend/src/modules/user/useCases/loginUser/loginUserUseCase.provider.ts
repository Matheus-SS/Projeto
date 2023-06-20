import { Provider } from '@nestjs/common';
import { LoginUserUseCase } from './loginUserUserCase';
import { LOGIN_USER_USE_CASE_PROVIDER } from '@src/constants';

export const LoginUserUseCaseProvider: Provider = {
  provide: LOGIN_USER_USE_CASE_PROVIDER,
  useClass: LoginUserUseCase,
};
