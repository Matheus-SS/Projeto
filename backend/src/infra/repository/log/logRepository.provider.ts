import { Provider } from '@nestjs/common';
import { LogRepository } from './logRepository';
import { LOG_REPOSITORY_PROVIDER } from '@src/constants';
export const LogRepositoryProvider: Provider = {
  provide: LOG_REPOSITORY_PROVIDER,
  useClass: LogRepository,
};
