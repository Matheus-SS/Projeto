import { api } from './api';

export async function createUser<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/user', data);
  return response.data;
}

export async function login<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/user/login', data);
  return response.data;
}

export async function getProfile<Response>(): Promise<Response> {
  const response = await api.get<Response>('/user/profile');
  return response.data;
}

export async function getSession<Response>(): Promise<Response> {
  const response = await api.get<Response>('/session');
  return response.data;
}

export async function logout<Response>(): Promise<Response> {
  const response = await api.delete<Response>('/session/logout');
  return response.data;
}
