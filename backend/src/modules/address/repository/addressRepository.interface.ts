export interface IAddress {
  id: number;
  user_id: number;
  cep: string;
  public_place?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
  created_at: Date;
  updated_at?: Date;
}

type User = {
  user_username: string;
  user_email: string;
  user_created_at: Date;
  user_updated_at?: Date;
};

export type CreateAddress = Omit<IAddress, 'id' | 'created_at' | 'updated_at'>;
export type IAddressAll = IAddress & User;
export interface IAddressRepository {
  create(data: CreateAddress): Promise<number>;
  findById(id: number): Promise<IAddressAll[]>;
  findByUserId(user_id: number): Promise<IAddressAll[]>;
  delete(id: number, user_id: number): Promise<void>;
}
