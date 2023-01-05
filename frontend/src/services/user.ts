import { api } from './api';

async function createUser(data): Promise<Response> {
  const response = await api.post<Response>('/user/create', data);
  return response.data;
}
