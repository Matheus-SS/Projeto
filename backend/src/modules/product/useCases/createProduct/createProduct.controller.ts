import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import {
  CREATE_PRODUCT_USE_CASE_PROVIDER,
  PRODUCT_ROUTE,
} from '@src/constants';
import { CreateProductUseCase } from './createProductUseCase';
import { CreateProduct } from '@modules/product/dto/createProductDTO';
import { Response } from 'express';
@Controller(PRODUCT_ROUTE)
export class CreateProductController extends BaseController {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE_PROVIDER)
    private createProduct: CreateProductUseCase,
  ) {
    super();
  }

  @Post()
  public async executeImpl(
    @Body() { description, name, price, quantity }: CreateProduct,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.createProduct.execute({
        description,
        name,
        price,
        quantity,
      });

      return this.ok(response, result);
    } catch (error: any) {
      return this.internalError(response, error.message);
    }
  }
}