import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SessionRepositoryModule } from '@modules/session/repository/sessionRepository.module';
import { FindSessionQueryProvider } from './query/findSession/findSessionQuery.provider';
import { SessionController } from './session.controller';
import { DeleteSessionUseCaseProvider } from './useCases/deleteSessionUseCase.provider';
import { DeleteSessionController } from './useCases/deleteSession.controller';

@Module({
  imports: [DatabaseModule, SessionRepositoryModule],
  providers: [FindSessionQueryProvider, DeleteSessionUseCaseProvider],
  controllers: [SessionController, DeleteSessionController],
  exports: [FindSessionQueryProvider],
})
export class SessionModule {}
