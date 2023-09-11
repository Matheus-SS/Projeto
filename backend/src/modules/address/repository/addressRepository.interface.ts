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

export type CreateAddress = Omit<IAddress, 'id' | 'created_at' | 'updated_at'>;

export interface IAddressRepository {
  create(data: CreateAddress): Promise<void>;
}
