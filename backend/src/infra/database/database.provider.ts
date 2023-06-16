import { Provider } from '@nestjs/common';
import TypeOrmDatabase from './typeormDatabase';
import { DATABASE_TYPEORM } from '@src/constants';

export const DatabaseProvider: Provider = {
  provide: DATABASE_TYPEORM,
  useClass: TypeOrmDatabase,
};
