import { CART_REPOSITORY_PROVIDER } from '@src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../repository/cartRepository.interface';
import { ListMyCart } from '../dto/listMyCartDTO';

@Injectable()
export class ListMyCartQuery {
  constructor(
    @Inject(CART_REPOSITORY_PROVIDER)
    private cartRepository: ICartRepository,
  ) {}

  public async execute(user_id: number): Promise<ListMyCart[]> {
    return this.cartRepository.find({
      user_id: user_id,
    });
  }
}
