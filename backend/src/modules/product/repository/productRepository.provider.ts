import { Provider } from '@nestjs/common';
import { ProductRepository } from './productRepository';
import { PRODUCT_REPOSITORY_PROVIDER } from '@src/constants';

export const ProductRepositoryProvider: Provider = {
  provide: PRODUCT_REPOSITORY_PROVIDER,
  useClass: ProductRepository,
};
