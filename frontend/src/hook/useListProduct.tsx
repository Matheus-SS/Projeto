import { useQuery } from '@tanstack/react-query';
import { listProduct } from '../services/product';
export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
export const useListProduct = () => {
  return useQuery<IProduct[]>(
    ['listProduct'],
    async () => {
      const response = await listProduct<IProduct[]>();
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
