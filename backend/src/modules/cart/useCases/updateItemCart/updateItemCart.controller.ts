import { Body, Controller, Res, Req, Patch } from '@nestjs/common';
import { BaseController } from '@shared/baseController';
import { CART_ROUTE } from '@src/constants';

import { Response, Request } from 'express';
import { UpdateItemCartUseCase } from './updateItemCartUseCase';

@Controller(CART_ROUTE)
export class UpdateItemCartController extends BaseController {
  constructor(private updateItemCartUseCase: UpdateItemCartUseCase) {
    super();
  }

  @Patch('/:id')
  public async executeImpl(
    @Req() request: Request,
    @Body() { type }: { type: 'INCREMENT' | 'DECREMENT' },
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.updateItemCartUseCase.execute({
        product_id: request.params.id,
        user_id: request.userId,
        type: type,
      });

      if (result.success === false) {
        if (result.error.name === 'ValidationInputError') {
          return this.badRequest(response, result.error.message, result.error);
        } else if (result.error.name === 'ProductNotFoundError') {
          return this.notFound(response, result.error.message, result.error);
        } else if (result.error.name === 'ProductOutStockError') {
          return this.badRequest(response, result.error.message, result.error);
        } else if (result.error.name === 'ProductGreaterThanAllowedError') {
          return this.badRequest(response, result.error.message, result.error);
        }
      } else {
        let mapped = [];
        if (result.data.length > 0) {
          mapped = result.data.map((value) => ({
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
      }
    } catch (error: any) {
      return this.internalError(response, error);
    }
  }
}
