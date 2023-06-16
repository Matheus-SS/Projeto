import { Module } from '@nestjs/common';
import { UserRepositoryProvider } from './userRespository.provider';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserRepositoryModule {}
