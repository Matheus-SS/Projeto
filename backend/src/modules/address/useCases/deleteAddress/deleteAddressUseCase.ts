import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY_PROVIDER } from '@src/constants';
import { ReturnType } from '@shared/returnType';

import { IAddressRepository } from '../../repository/addressRepository.interface';
import { AddressNotFoundError } from './deleteAddressError';
import { ValidationInputError } from '@shared/validationError';

@Injectable()
export class DeleteAddressUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY_PROVIDER)
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(
    id: number,
    user_id: number,
  ): Promise<ReturnType<AddressNotFoundError | ValidationInputError, void>> {
    if (!id) {
      return {
        error: new ValidationInputError(
          'Id obrigatório para exclusão de endereço',
        ),
        success: false,
      };
    }

    if (!user_id) {
      return {
        error: new ValidationInputError(
          'UserId obrigatório para exclusão de endereço',
        ),
        success: false,
      };
    }
    const address = await this.addressRepository.findById(id);

    if (!address[0]) {
      return {
        error: new AddressNotFoundError(),
        success: false,
      };
    }

    if (address[0].user_id !== user_id) {
      return {
        error: new AddressNotFoundError(),
        success: false,
      };
    }

    await this.addressRepository.delete(id, user_id);

    return {
      data: null,
      success: true,
    };
  }
}
