import { Provider } from '@nestjs/common';
import { ADD_TO_CART_USE_CASE_PROVIDER } from '@src/constants';
import { AddToCartUseCase } from './addToCartUseCase';
export const AddToCartUseCaseProvider: Provider = {
  provide: ADD_TO_CART_USE_CASE_PROVIDER,
  useClass: AddToCartUseCase,
};
