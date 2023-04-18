import { Provider } from '@nestjs/common';
import { SESSION_USER_PROVIDER } from '../../../../constants';
import { SessionUserUseCase } from './sessionUserUseCase';

export const SessionUserProvider: Provider = {
  provide: SESSION_USER_PROVIDER,
  useClass: SessionUserUseCase,
};
