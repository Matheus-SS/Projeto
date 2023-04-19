import { Provider } from '@nestjs/common';
import { LOGOUT_USER_PROVIDER } from '../../../../constants';
import { LogoutUserUseCase } from './logoutUserUseCase';

export const LogoutUserProvider: Provider = {
  provide: LOGOUT_USER_PROVIDER,
  useClass: LogoutUserUseCase,
};
