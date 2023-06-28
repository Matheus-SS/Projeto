export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CreateProduct = Omit<IProduct, 'id' | 'created_at' | 'updated_at'>;

export interface IProductRepository {
  create(data: CreateProduct): Promise<void>;
}
