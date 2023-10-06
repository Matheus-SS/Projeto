import { Body, Controller, Res, Req, Post, Get, Delete } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { ADDRESS_ROUTE } from '@src/constants';

import { Response, Request } from 'express';
import { CreateAddressUseCase } from './useCases/createAddress/createAddressUseCase';
import { ListAddressByUserIdUseCase } from './useCases/listAddressByUserId/listAddressByUserIdUseCase';
import { DeleteAddressUseCase } from './useCases/deleteAddress/deleteAddressUseCase';

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
  constructor(
    private createAddress: CreateAddressUseCase,
    private listAddressByUserId: ListAddressByUserIdUseCase,
    private deleteAddress: DeleteAddressUseCase,
  ) {
    super();
  }

  @Post()
  public async create(
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
  @Get('/me')
  public async listMyAddress(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.listAddressByUserId.execute(request.userId);

      if (result.success === false) {
        return;
      }
      const mapped = result.data.map((res) => ({
        id: res.id,
        cep: res.cep,
        public_place: res.public_place,
        complement: res.complement,
        neighborhood: res.neighborhood,
        city: res.city,
        uf: res.uf,
      }));
      return this.ok(response, mapped);
    } catch (error: any) {
      console.error('CreateAddress', error);
      return this.internalError(response, error);
    }
  }

  @Delete(':id')
  public async delete(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.deleteAddress.execute(
        Number(request.params.id),
        request.userId,
      );

      if (result.success === false) {
        if (result.error.name === 'ValidationInputError') {
          return this.badRequest(response, result.error.message, result.error);
        } else if (result.error.name === 'AddressNotFoundError') {
          return this.badRequest(response, result.error.message, result.error);
        }
      } else {
        return this.ok(response);
      }
    } catch (error: any) {
      console.error('CreateAddress', error);
      return this.internalError(response, error);
    }
  }
}
