export interface ISession {
  id: string;
  user_id: number;
  created_at: Date;
}
export interface ISessionFind {
  id: number;
  session_id: string;
  email: string;
  username: string;
  created_at: Date;
}
export interface ISessionRepository {
  create(
    data: Pick<ISession, 'user_id'>,
  ): Promise<Omit<ISession, 'created_at'>>;
  find(data: Pick<ISession, 'id'>): Promise<ISessionFind[]>;
  delete(id: string): Promise<void>;
}
