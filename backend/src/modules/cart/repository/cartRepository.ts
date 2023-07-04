import { Product } from '@infra/database/entity/Product.entity';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TYPEORM } from '@src/constants';
import { CreateCart, ICartRepository } from './cartRepository.interface';
import { Cart } from '@infra/database/entity/Cart.entity';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}

  private get cart() {
    return this.database.connection.getRepository(Cart);
  }
  public async create(data: CreateCart): Promise<void> {
    const product = this.cart.create({
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity,
    });

    await this.cart.insert(product);
  }
}
