import { api } from './api';

export async function listProduct<Response>(): Promise<Response> {
  const response = await api.get<Response>('/product');
  return response.data;
}
