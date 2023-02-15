import { api } from './api';

export async function createUser<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/user/create', data);
  return response.data;
}

export async function login<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/user/login', data, {
    withCredentials: true,
  });
  return response.data;
}
