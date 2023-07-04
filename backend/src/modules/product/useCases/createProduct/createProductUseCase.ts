import { CreateProduct } from '@modules/product/dto/createProductDTO';
import { IProductRepository } from '@modules/product/repository/productRepository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY_PROVIDER } from '@src/constants';
import * as validation from '@shared/util/validation';
import { ValidationInputError } from '@shared/validationError';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PROVIDER)
    private productRepository: IProductRepository,
  ) {}

  public async execute(
    data: CreateProduct,
  ): Promise<void | ValidationInputError> {
    if (validation.againstNullOrUndefined(data.name.trim())) {
      return new ValidationInputError('Nome do produto obrigatório');
    }

    if (!validation.numberChecker(data.price)) {
      return new ValidationInputError('Preço deve ser um número');
    }

    if (!validation.numberChecker(data.quantity)) {
      return new ValidationInputError('Quantidade deve ser um número');
    }

    if (data.price == 0 || data.price < 0) {
      return new ValidationInputError('Preço deve ser maior que zero');
    }

    if (data.quantity == 0 || data.quantity < 0) {
      return new ValidationInputError('Quantidade deve ser maior que zero');
    }
    await this.productRepository.create(data);
  }
}
