import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY_PROVIDER,
  PRODUCT_REPOSITORY_PROVIDER,
} from '@src/constants';
import { ICartRepository } from '@modules/cart/repository/cartRepository.interface';
import { AddToCart } from '@modules/cart/dto/addToCartDTO';
import { IProductRepository } from '@modules/product/repository/productRepository.interface';
import {
  ProductGreaterThanAllowed,
  ProductNotFoundError,
  ProductOutStock,
} from './addToCartError';
import { ValidationInputError } from '@shared/validationError';
import * as validation from '@shared/util/validation';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY_PROVIDER)
    private cartRepository: ICartRepository,
    @Inject(PRODUCT_REPOSITORY_PROVIDER)
    private productRepository: IProductRepository,
  ) {}

  public async execute(
    data: AddToCart,
  ): Promise<
    | void
    | ValidationInputError
    | ProductNotFoundError
    | ProductOutStock
    | ProductGreaterThanAllowed
  > {
    if (validation.againstNullOrUndefined(data.product_id)) {
      return new ValidationInputError('Id do produto obrigatório');
    }

    if (!validation.numberChecker(data.quantity)) {
      return new ValidationInputError('Quantidade deve ser um número');
    }

    if (data.quantity <= 0) {
      return new ValidationInputError('Quantidade deve ser maior que zero');
    }

    const product = await this.productRepository.findById(data.product_id);
    if (product.length == 0) {
      return new ProductNotFoundError();
    }

    if (product[0].quantity == 0) {
      return new ProductOutStock();
    }

    if (data.quantity >= product[0].quantity) {
      return new ProductGreaterThanAllowed();
    }

    const itemInCart = await this.cartRepository.find({
      product_id: data.product_id,
      user_id: data.user_id,
    });

    if (itemInCart[0]) {
      const sum = itemInCart[0].quantity + data.quantity;

      if (sum >= product[0].quantity) {
        return new ProductGreaterThanAllowed();
      }

      await this.cartRepository.update({
        product_id: data.product_id,
        user_id: data.user_id,
        quantity: sum,
      });
      return;
    }
    await this.cartRepository.create(data);
  }
}
