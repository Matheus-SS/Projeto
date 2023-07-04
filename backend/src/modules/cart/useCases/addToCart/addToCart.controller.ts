import { AddToCart } from '@modules/cart/dto/addToCartDTO';
import { Body, Controller, Inject, Post, Res, Req } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { ADD_TO_CART_USE_CASE_PROVIDER, CART_ROUTE } from '@src/constants';

import { Response, Request } from 'express';

@Controller(CART_ROUTE)
export class AddToCartController extends BaseController {
  constructor(
    @Inject(ADD_TO_CART_USE_CASE_PROVIDER)
    private addToCart: InterfaceUseCase<AddToCart, any>,
  ) {
    super();
  }

  @Post()
  public async executeImpl(
    @Req() request: Request,
    @Body() { product_id, quantity }: AddToCart,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.addToCart.execute({
        product_id,
        user_id: request.userId,
        quantity,
      });

      return this.ok(response, result);
    } catch (error: any) {
      return this.internalError(response, error.message);
    }
  }
}
