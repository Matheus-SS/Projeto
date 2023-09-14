import { Module } from '@nestjs/common';
import { SqliteProvider } from './sqlite.provider';

@Module({
  providers: [SqliteProvider],
  exports: [SqliteProvider],
})
export class SqliteModule {}
