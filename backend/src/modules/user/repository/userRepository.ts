import { Inject, Injectable } from '@nestjs/common';
import {
  IUser,
  IUserRepository,
} from '@modules/user/repository/userRepository.interface';
import { DATABASE } from '@src/constants';
import { User } from '@infra/database/entity/User.entity';
import TypeOrmDatabase from '@infra/database/typeormDatabase';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE)
    private database: TypeOrmDatabase,
  ) {}

  private get user() {
    return this.database.connection.getRepository(User);
  }

  public async create(data: Omit<IUser, 'id'>): Promise<number> {
    const user = this.user.create(data);
    const result = await this.user.insert(user);
    return result.identifiers[0].id;
  }

  public async findByEmail(email: string): Promise<IUser> {
    return await this.user.findOne({
      where: {
        email: email,
      },
    });
  }
}
