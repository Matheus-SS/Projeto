import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TYPEORM } from '@src/constants';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { ISession, ISessionRepository } from './sessionRepository.interface';
import { Session } from '@infra/database/entity/Session.entity';
import { randomUUID } from 'crypto';
@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}

  private get session() {
    return this.database.connection.getRepository(Session);
  }

  public async save(data: Pick<ISession, 'user_id'>): Promise<ISession> {
    return this.session.save({
      user_id: data.user_id,
      id: randomUUID(),
    });
  }
}
