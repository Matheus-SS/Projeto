import { Module } from '@nestjs/common';
import { UserRepositoryProvider } from './userRespository.provider';

@Module({
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserRepositoryModule {}
