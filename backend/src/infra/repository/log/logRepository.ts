import { DATABASE_TYPEORM } from '@src/constants';
import { Inject, Injectable } from '@nestjs/common';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Log } from '@infra/database/entity/Log.entity';
@Injectable()
export class LogRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}
  private get log() {
    return this.database.connection.getRepository(Log);
  }

  public async create(data: any) {
    const log = this.log.create({
      request: data.request,
      response: data.response,
      path: data.path,
      method: data.method,
      created_at: data.created_at,
      status_code: data.status_code,
      response_time: data.response_time,
    });

    await this.log.insert(log);
  }
}
