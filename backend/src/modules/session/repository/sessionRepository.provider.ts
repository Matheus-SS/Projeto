import { Provider } from '@nestjs/common';
import { SESSION_REPOSITORY_PROVIDER } from '@src/constants';
import { SessionRepository } from './sessionRepository';

export const SessionRepositoryProvider: Provider = {
  provide: SESSION_REPOSITORY_PROVIDER,
  useClass: SessionRepository,
};
