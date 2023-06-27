import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository } from '@modules/session/repository/sessionRepository.interface';

import { SESSION_REPOSITORY_PROVIDER } from '@src/constants';
import { SessionNotFoundError } from './deleteSessionError';

@Injectable()
export class DeleteSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY_PROVIDER)
    private sessionRepository: ISessionRepository,
  ) {}

  public async execute(id: string): Promise<void | SessionNotFoundError> {
    const session = await this.sessionRepository.find({
      id: id,
    });

    if (!session) {
      return new SessionNotFoundError();
    }

    await this.sessionRepository.delete(session[0].session_id);
  }
}
