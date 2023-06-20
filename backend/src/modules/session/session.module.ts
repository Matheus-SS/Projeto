import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SessionRepositoryModule } from '@modules/session/repository/sessionRepository.module';
import { FindSessionQueryProvider } from './query/findSession/findSessionQuery.provider';
import { SessionController } from './session.controller';

@Module({
  imports: [DatabaseModule, SessionRepositoryModule],
  providers: [FindSessionQueryProvider],
  controllers: [SessionController],
  exports: [FindSessionQueryProvider],
})
export class SessionModule {}
