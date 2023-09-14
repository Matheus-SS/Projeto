import { Provider } from '@nestjs/common';
import TypeOrmDatabase from './typeormDatabase';
import { DATABASE } from '@src/constants';

export const DatabaseProvider: Provider = {
  provide: DATABASE,
  useClass: TypeOrmDatabase,
};
