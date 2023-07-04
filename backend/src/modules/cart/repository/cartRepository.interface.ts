export interface ICart {
  user_id: number;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CreateCart = Omit<ICart, 'created_at' | 'updated_at'>;
export interface ICartRepository {
  create(data: CreateCart): Promise<void>;
}
