import { PRODUCT_REPOSITORY_PROVIDER } from '@src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { IListProduct } from '@modules/product/dto/listProductDTO';
import { IProductRepository } from '@modules/product/repository/productRepository.interface';

@Injectable()
export class ListProductQuery {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PROVIDER)
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IListProduct[]> {
    return this.productRepository.list();
  }
}
