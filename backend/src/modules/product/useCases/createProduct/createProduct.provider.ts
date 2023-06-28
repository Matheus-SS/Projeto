import { Provider } from '@nestjs/common';
import { CREATE_PRODUCT_USE_CASE_PROVIDER } from '@src/constants';
import { CreateProductUseCase } from './createProductUseCase';

export const CreateProductUseCaseProvider: Provider = {
  provide: CREATE_PRODUCT_USE_CASE_PROVIDER,
  useClass: CreateProductUseCase,
};
