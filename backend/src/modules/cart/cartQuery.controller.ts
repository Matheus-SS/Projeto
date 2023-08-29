import { Controller, Inject, Get, Res, Req } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { InterfaceQuery } from '@shared/query.interface';
import { CART_ROUTE, LIST_MY_CART_QUERY_PROVIDER } from '@src/constants';
import { Response, Request } from 'express';
import { ListMyCart } from './dto/listMyCartDTO';

@Controller(CART_ROUTE)
export class CartQueryController extends BaseController {
  constructor(
    @Inject(LIST_MY_CART_QUERY_PROVIDER)
    private listMyCart: InterfaceQuery<number, Promise<ListMyCart[]>>,
  ) {
    super();
  }

  @Get()
  public async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.listMyCart.execute(request.userId);

      let mapped = [];
      if (result.length > 0) {
        mapped = result.map((value) => ({
          id: value.id,
          user_id: value.user_id,
          product_id: value.product_id,
          price: value.price,
          image: value.image,
          name: value.name,
          quantity: value.quantity,
        }));
      }
      return this.ok(response, mapped);
    } catch (error: any) {
      return this.internalError(response, error.message);
    }
  }
}
