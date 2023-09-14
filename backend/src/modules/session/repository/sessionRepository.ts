import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from '@src/constants';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import {
  ISession,
  ISessionFind,
  ISessionRepository,
} from './sessionRepository.interface';
import { Session } from '@infra/database/entity/Session.entity';
import { randomUUID } from 'crypto';
@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @Inject(DATABASE)
    private database: TypeOrmDatabase,
  ) {}

  private get session() {
    return this.database.connection.getRepository(Session);
  }

  public async create(
    data: Pick<ISession, 'user_id'>,
  ): Promise<Omit<ISession, 'createdAt'>> {
    const session = this.session.create({
      user_id: data.user_id,
      id: randomUUID(),
    });
    await this.session.insert(session);
    return session;
  }

  public async find(data: Pick<ISession, 'id'>): Promise<ISessionFind[]> {
    return this.session.query(
      `
        select
          B.id,
          A.id as session_id,
          B.username,
          B.email,
          A.created_at 
        from
          tbl_session A
        join 
          tbl_user B
        on
          A.user_id = B.id
        where A.id = $1
    `,
      [data.id],
    );
  }

  public async delete(id: string): Promise<void> {
    await this.session.delete({ id: id });
  }
}
