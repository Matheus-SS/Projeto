export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
}
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
  save(data: Omit<IUser, 'id'>): Promise<void>;
}
