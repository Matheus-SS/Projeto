import { UserEntity } from '../entity/User';

export interface InterfaceUserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  createUser(createUser: UserEntity): Promise<UserEntity>;
}
