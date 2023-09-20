import { Body, Controller, Res, Req, Post } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { ADDRESS_ROUTE } from '@src/constants';

import { Response, Request } from 'express';
import { CreateAddressUseCase } from './useCases/createAddress/createAddressUseCase';

type CreateAddress = {
  cep: string;
  public_place?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
};

@Controller(ADDRESS_ROUTE)
export class AddressController extends BaseController {
  constructor(private createAddress: CreateAddressUseCase) {
    super();
  }

  @Post()
  public async executeImpl(
    @Req() request: Request,
    @Body() data: CreateAddress,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.createAddress.execute({
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        uf: data.uf,
        user_id: request.userId,
        complement: data?.complement,
        public_place: data?.complement,
      });

      if (result.success === false) {
        if (result.error.name === 'ValidationInputError') {
          return this.badRequest(response, result.error.message, result.error);
        }
      } else {
        return this.created(response, result.data);
      }
    } catch (error: any) {
      console.error('CreateAddress', error);
      return this.internalError(response, error);
    }
  }
}
