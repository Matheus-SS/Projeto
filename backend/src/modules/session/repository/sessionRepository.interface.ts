export interface ISession {
  id: string;
  user_id: number;
  created_at: Date;
}
export interface ISessionRepository {
  save(data: Pick<ISession, 'user_id'>): Promise<ISession>;
}
