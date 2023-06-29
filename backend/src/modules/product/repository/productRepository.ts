import { Product } from '@infra/database/entity/Product.entity';
import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TYPEORM } from '@src/constants';
import { randomUUID } from 'crypto';
import {
  CreateProduct,
  IProduct,
  IProductRepository,
} from './productRepository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}

  private get product() {
    return this.database.connection.getRepository(Product);
  }
  public async create(data: CreateProduct): Promise<void> {
    const product = this.product.create({
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
    });

    await this.product.insert(product);
  }

  async list(): Promise<IProduct[]> {
    return this.product.query(`
      SELECT * FROM tbl_product
    `);
  }
}
