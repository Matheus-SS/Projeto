import { Provider } from '@nestjs/common';
import TypeormSqlLiteDatabase from './typeormSqlLiteDatabase';
import { DATABASE_TYPEORM } from '@src/constants';

export const TypeormSqlLiteDatabaseProvider: Provider = {
  provide: DATABASE_TYPEORM,
  useClass: TypeormSqlLiteDatabase,
};
