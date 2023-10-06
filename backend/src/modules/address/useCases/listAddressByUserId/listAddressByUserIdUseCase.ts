import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY_PROVIDER } from '@src/constants';
import { ReturnType } from '@shared/returnType';

import { IAddressRepository } from '../../repository/addressRepository.interface';

type CreateAddressResponse = {
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
  user_username: string;
  user_email: string;
  user_created_at: Date;
  user_updated_at?: Date;
};

@Injectable()
export class ListAddressByUserIdUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY_PROVIDER)
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(
    user_id: number,
  ): Promise<ReturnType<void, CreateAddressResponse[]>> {
    const address = await this.addressRepository.findByUserId(user_id);

    return { data: address, success: true };
  }
}
