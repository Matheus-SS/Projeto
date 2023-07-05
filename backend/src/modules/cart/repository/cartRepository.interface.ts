export interface ICart {
  id: number;
  user_id: number;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CartFilter = {
  product_id?: string;
  user_id?: number;
};
export type CreateCart = Omit<ICart, 'id' | 'created_at' | 'updated_at'>;

export type UpdateCart = Partial<ICart>;

export interface ICartRepository {
  create(data: CreateCart): Promise<void>;
  find(data: CartFilter): Promise<ICart[]>;
  update(data: UpdateCart): Promise<void>;
}
