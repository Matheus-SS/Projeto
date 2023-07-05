import { Controller, Inject, Get, Res } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { InterfaceQuery } from '@shared/query.interface';
import { LIST_PRODUCT_QUERY_PROVIDER, PRODUCT_ROUTE } from '@src/constants';
import { Response } from 'express';
import { IListProduct } from './dto/listProductDTO';
@Controller(PRODUCT_ROUTE)
export class ProductQueryController extends BaseController {
  constructor(
    @Inject(LIST_PRODUCT_QUERY_PROVIDER)
    private listProduct: InterfaceQuery<any, Promise<IListProduct>>,
  ) {
    super();
  }

  @Get()
  public async executeImpl(@Res() response: Response): Promise<Response> {
    try {
      const result = await this.listProduct.execute();

      return this.ok(response, result);
    } catch (error: any) {
      return this.internalError(response, error.message);
    }
  }
}
