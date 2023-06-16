import { Inject, Injectable } from '@nestjs/common';
import {
  IUser,
  IUserRepository,
} from '@modules/user/repository/userRepository.interface';
import { DATABASE_TYPEORM } from '@src/constants';
import { User } from '@infra/database/entity/User.entity';
import TypeOrmDatabase from '@infra/database/typeormDatabase';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}

  private get user() {
    return this.database.connection.getRepository(User);
  }

  public async save(data: Omit<IUser, 'id'>): Promise<void> {
    await this.user.save(data);
  }

  public async findByEmail(email: string): Promise<IUser> {
    return this.user.findOne({
      where: {
        email: email,
      },
    });
  }
}
