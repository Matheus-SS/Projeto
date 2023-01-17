import { api } from './api';

export async function createUser<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/user/create', data);
  return response.data;
}
