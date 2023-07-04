import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY_PROVIDER } from '@src/constants';
import { ICartRepository } from '@modules/cart/repository/cartRepository.interface';
import { AddToCart } from '@modules/cart/dto/addToCartDTO';
@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY_PROVIDER)
    private cartRepository: ICartRepository,
  ) {}

  public async execute(data: AddToCart): Promise<any> {
    await this.cartRepository.create(data);
  }
}
