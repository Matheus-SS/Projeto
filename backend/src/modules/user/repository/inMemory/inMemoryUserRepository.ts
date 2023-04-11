import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entity/User';
import { InterfaceUserRepository } from '../userRepository.interface';
const user = UserEntity.createUser({
  username: 'guinho',
  email: 'matheus_sa_santos@hotmail.com',
  password: '$2b$10$ZGFlaP0DiowJssOyYrxA8eUMO478Nh3WrNyRZBI11..8xZzv2u.pW',
});
@Injectable()
export class InMemoryUserRepository implements InterfaceUserRepository {
  item: UserEntity[] = [user.getValue()];
  public async createUser(createUser: UserEntity): Promise<UserEntity> {
    this.item.push(createUser);
    return createUser;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = this.item.find((user) => user.getEmail.getValue === email);

    return user;
  }
}
