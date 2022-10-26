import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entity/User';
import { InterfaceUserRepository } from '../userRepository.interface';
const user = UserEntity.createUser({
  username: 'string',
  email: 'string1@gmail.com',
  password: 'string',
});
@Injectable()
export class InMemoryUserRepository implements InterfaceUserRepository {
  item: UserEntity[] = [user.getValue()];
  public async createUser(createUser: UserEntity): Promise<UserEntity> {
    this.item.push(createUser);
    return createUser;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = this.item.find((user) => user.getEmail === email);

    return user;
  }
}
