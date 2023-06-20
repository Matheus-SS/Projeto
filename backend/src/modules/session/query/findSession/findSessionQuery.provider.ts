import { Provider } from '@nestjs/common';
import { FindSessionQuery } from './findSessionQuery';
import { FIND_SESSION_QUERY_PROVIDER } from '@src/constants';
export const FindSessionQueryProvider: Provider = {
  useClass: FindSessionQuery,
  provide: FIND_SESSION_QUERY_PROVIDER,
};
