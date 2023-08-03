import {
  IUser,
  IUserRepository,
} from '@modules/user/repository/userRepository.interface';

export class FakeUserRepository implements IUserRepository {
  findByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  create(data: Omit<IUser, 'id'>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
