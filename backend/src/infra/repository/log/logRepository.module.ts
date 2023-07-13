import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import { LogRepositoryProvider } from './logRepository.provider';

@Module({
  imports: [DatabaseModule],
  providers: [LogRepositoryProvider],
  exports: [LogRepositoryProvider],
})
export class LogRepositoryModule {}
