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
  const response = await api.post<Response>('/user/login', data);
  return response.data;
}

export async function getProfile<Request, Response>(): Promise<Response> {
  const response = await api.get<Response>('/user/profile');
  return response.data;
}

export async function getSession<Request, Response>(): Promise<Response> {
  const response = await api.get<Response>('/user/session');
  return response.data;
}
