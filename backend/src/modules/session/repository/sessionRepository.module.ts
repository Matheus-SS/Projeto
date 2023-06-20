import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { SessionRepositoryProvider } from './sessionRepository.provider';

@Module({
  imports: [DatabaseModule],
  providers: [SessionRepositoryProvider],
  exports: [SessionRepositoryProvider],
})
export class SessionRepositoryModule {}
