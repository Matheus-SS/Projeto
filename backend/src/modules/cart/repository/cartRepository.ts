import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TYPEORM } from '@src/constants';
import {
  CartFilter,
  CreateCart,
  ICart,
  ICartRepository,
  UpdateCart,
} from './cartRepository.interface';
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

  public async find(data: CartFilter): Promise<ICart[]> {
    let query = '';
    const paramenters = [];
    if (data.user_id) {
      query = `where A.user_id = $1`;
      paramenters.push(data.user_id);
    } else {
      query = '';
    }

    if (data.product_id && data.user_id) {
      query += ` AND B.id = $2`;
      paramenters.push(data.product_id);
    } else if (data.product_id) {
      query = `where B.id = $1`;
      paramenters.push(data.product_id);
    } else {
      query += '';
    }

    return this.cart.query(
      `
      select
        A.id as id,
        B.id as product_id,
        A.user_id as user_id,
        A.quantity as quantity,
        B.price as price,
        B.image as image,
        B.name as name,
        A.created_at as created_at,
        A.updated_at as updated_at
      from
        tbl_cart A
      join 
        tbl_product B 
      on
        A.product_id = B.id
       ${query}
      order by created_at
    `,
      paramenters,
    );
  }

  public async update(data: UpdateCart): Promise<void> {
    await this.cart.update(
      {
        product_id: data.product_id,
        user_id: data.user_id,
      },
      {
        quantity: data.quantity,
        updated_at: new Date(),
      },
    );
  }
}
