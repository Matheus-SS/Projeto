export interface ICart {
  id: number;
  user_id: number;
  product_id: string;
  price: number;
  image: string;
  name: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CartFilter = {
  product_id?: string;
  user_id?: number;
};
export type CreateCart = Omit<
  ICart,
  'id' | 'created_at' | 'updated_at' | 'price' | 'image' | 'name'
>;

export type UpdateCart = Partial<ICart>;

export type DeleteCart = {
  product_id: string;
  user_id: number;
};
export interface ICartRepository {
  create(data: CreateCart): Promise<void>;
  find(data: CartFilter): Promise<ICart[]>;
  update(data: UpdateCart): Promise<void>;
  delete(data: DeleteCart): Promise<void>;
}
