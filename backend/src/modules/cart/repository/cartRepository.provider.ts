import { Provider } from '@nestjs/common';
import { CartRepository } from './cartRepository';
import { CART_REPOSITORY_PROVIDER } from '@src/constants';
export const CartRepositoryProvider: Provider = {
  provide: CART_REPOSITORY_PROVIDER,
  useClass: CartRepository,
};
