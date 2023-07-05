import { Provider } from '@nestjs/common';
import { LIST_MY_CART_QUERY_PROVIDER } from '@src/constants';
import { ListMyCartQuery } from './listMyCartQuery';

export const ListMyCartQueryProvider: Provider = {
  useClass: ListMyCartQuery,
  provide: LIST_MY_CART_QUERY_PROVIDER,
};
