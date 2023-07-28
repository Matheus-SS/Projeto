import { Module } from '@nestjs/common';
import { TypeormSqlLiteDatabaseProvider } from './typeormSqlLiteDatabase.provider';
import TypeOrmSqlLiteDatabase from './typeormSqlLiteDatabase';

@Module({
  providers: [TypeormSqlLiteDatabaseProvider],
  exports: [TypeormSqlLiteDatabaseProvider],
})
export class TypeormSqlLiteDatabaseModule {}
