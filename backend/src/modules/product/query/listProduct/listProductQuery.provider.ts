import { Provider } from '@nestjs/common';
import { ListProductQuery } from './listProductQuery';
import { LIST_PRODUCT_QUERY_PROVIDER } from '@src/constants';

export const ListProductQueryProvider: Provider = {
  useClass: ListProductQuery,
  provide: LIST_PRODUCT_QUERY_PROVIDER,
};
