import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY_PROVIDER,
  PRODUCT_REPOSITORY_PROVIDER,
} from '@src/constants';
import {
  ICart,
  ICartRepository,
} from '@modules/cart/repository/cartRepository.interface';
import { IProductRepository } from '@modules/product/repository/productRepository.interface';
import {
  ProductGreaterThanAllowedError,
  ProductNotFoundError,
  ProductOutStockError,
} from './updateItemCartError';
import { ReturnType } from '@shared/returnType';
import { z } from 'zod';
import { ValidationInputError } from '@shared/validationError';

type UpdateItemCart = {
  product_id: string;
  user_id: number;
  type: 'INCREMENT' | 'DECREMENT';
};

@Injectable()
export class UpdateItemCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY_PROVIDER)
    private cartRepository: ICartRepository,
    @Inject(PRODUCT_REPOSITORY_PROVIDER)
    private productRepository: IProductRepository,
  ) {}

  // private validateInput() {
  //   const userSchema =
  // }
  public async execute({
    product_id,
    user_id,
    type,
  }: UpdateItemCart): Promise<
    ReturnType<
      | ValidationInputError
      | ProductNotFoundError
      | ProductOutStockError
      | ProductGreaterThanAllowedError,
      ICart[]
    >
  > {
    const itemSchema = z.object({
      product_id: z.string({
        required_error: 'Id do produto é obrigatório',
      }),
      user_id: z.number({
        required_error: 'Id do usuário é obrigatório',
      }),
      type: z.enum(['INCREMENT', 'DECREMENT'], {
        errorMap: (issue) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: 'Valor deve ser uma string' };
            case 'invalid_enum_value':
              return { message: 'Tipo deve ser INCREMENT ou DECREMENT' };
            default:
              return { message: 'Tipo inválido' };
          }
        },
      }),
    });

    const results = itemSchema.safeParse({ product_id, user_id, type });

    if (results.success === false) {
      const { issues } = results.error;
      return {
        error: new ValidationInputError(issues[0].message),
        success: false,
      };
    }

    const product = await this.productRepository.findById(product_id);
    if (product.length == 0) {
      return { error: new ProductNotFoundError(), success: false };
    }

    const itemInCart = await this.cartRepository.find({
      product_id: product_id,
      user_id: user_id,
    });

    if (!itemInCart[0]) {
      return { error: new ProductNotFoundError(), success: false };
    }

    if (product[0].quantity == 0) {
      await this.cartRepository.delete({
        product_id,
        user_id,
      });
      return { error: new ProductOutStockError(), success: false };
    }

    if (type === 'INCREMENT') {
      const sumItemQuantity = itemInCart[0].quantity + 1;

      if (sumItemQuantity >= product[0].quantity) {
        return { error: new ProductGreaterThanAllowedError(), success: false };
      } else {
        await this.cartRepository.update({
          product_id: product_id,
          user_id: user_id,
          quantity: sumItemQuantity,
        });

        const cart = await this.cartRepository.find({
          product_id: product_id,
          user_id: user_id,
        });

        return { data: cart, success: true };
      }
    } else if (type === 'DECREMENT') {
      const subtractionItemQuantity = itemInCart[0].quantity - 1;
      if (subtractionItemQuantity >= product[0].quantity) {
        return { error: new ProductGreaterThanAllowedError(), success: false };
      } else if (subtractionItemQuantity == 0) {
        await this.cartRepository.delete({
          product_id,
          user_id,
        });

        const cart = await this.cartRepository.find({
          product_id: product_id,
          user_id: user_id,
        });

        return { data: cart, success: true };
      } else {
        await this.cartRepository.update({
          product_id: product_id,
          user_id: user_id,
          quantity: subtractionItemQuantity,
        });

        const cart = await this.cartRepository.find({
          product_id: product_id,
          user_id: user_id,
        });

        return { data: cart, success: true };
      }
    }
  }
}
