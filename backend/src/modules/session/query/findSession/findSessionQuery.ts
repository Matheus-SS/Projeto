import { SESSION_REPOSITORY_PROVIDER } from '@src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository } from '@modules/session/repository/sessionRepository.interface';
import { IFindSession } from '../dto/findSessionDTO';

@Injectable()
export class FindSessionQuery {
  constructor(
    @Inject(SESSION_REPOSITORY_PROVIDER)
    private sessionRepository: ISessionRepository,
  ) {}

  public async execute(id: string): Promise<IFindSession[]> {
    return this.sessionRepository.find({
      id: id,
    });
  }
}
