import { Provider } from '@nestjs/common';
import { ADD_CART_USE_CASE_PROVIDER } from '@src/constants';
import { AddToCartUseCase } from './addToCartUseCase';

export const AddUpdateCartUseCaseProvider: Provider = {
  provide: ADD_CART_USE_CASE_PROVIDER,
  useClass: AddToCartUseCase,
};
