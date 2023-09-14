import { Provider } from '@nestjs/common';
import { DATABASE } from '@src/constants';
import SqliteDatabase from './sqliteDatabase';

export const SqliteProvider: Provider = {
  provide: DATABASE,
  useClass: SqliteDatabase,
};
