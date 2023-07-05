import { AddToCart } from '@modules/cart/dto/addToCartDTO';
import { Body, Controller, Inject, Post, Res, Req } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { ValidationInputError } from '@shared/validationError';
import { ADD_CART_USE_CASE_PROVIDER, CART_ROUTE } from '@src/constants';

import { Response, Request } from 'express';
import {
  ProductGreaterThanAllowed,
  ProductNotFoundError,
  ProductOutStock,
} from './addToCartError';

@Controller(CART_ROUTE)
export class AddCartController extends BaseController {
  constructor(
    @Inject(ADD_CART_USE_CASE_PROVIDER)
    private addToCart: InterfaceUseCase<
      AddToCart,
      Promise<
        | void
        | ValidationInputError
        | ProductNotFoundError
        | ProductOutStock
        | ProductGreaterThanAllowed
      >
    >,
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

      if (result instanceof ValidationInputError) {
        return this.badRequest(response, result.message);
      }
      if (result instanceof ProductNotFoundError) {
        return this.notFound(response, result.message);
      }
      if (result instanceof ProductOutStock) {
        return this.badRequest(response, result.message);
      }
      if (result instanceof ProductGreaterThanAllowed) {
        return this.badRequest(response, result.message);
      }
      return this.ok(response, result);
    } catch (error: any) {
      return this.internalError(response, error.message);
    }
  }
}
