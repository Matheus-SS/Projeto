import { CreateProduct } from '@modules/product/dto/createProductDTO';
import { IProductRepository } from '@modules/product/repository/productRepository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY_PROVIDER } from '@src/constants';
@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PROVIDER)
    private productRepository: IProductRepository,
  ) {}

  public async execute(data: CreateProduct): Promise<any> {
    await this.productRepository.create(data);
  }
}
