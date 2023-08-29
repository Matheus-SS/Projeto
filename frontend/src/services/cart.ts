import { api } from './api';

export async function addCart<Request, Response>(
  data: Request
): Promise<Response> {
  const response = await api.post<Response>('/cart', data);
  return response.data;
}

export async function getMyCart<Response>(): Promise<Response> {
  const response = await api.get<Response>('/cart');
  return response.data;
}

export async function updateItemCart<Response>(
  id: string,
  type: 'INCREMENT' | 'DECREMENT'
): Promise<Response> {
  const response = await api.patch<Response>(`/cart/${id}`, {
    type: type,
  });
  return response.data;
}
