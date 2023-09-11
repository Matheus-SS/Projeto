import { Provider } from '@nestjs/common';
import { AddressRepository } from './addressRepository';
import { ADDRESS_REPOSITORY_PROVIDER } from '@src/constants';
export const AddressRepositoryProvider: Provider = {
  provide: ADDRESS_REPOSITORY_PROVIDER,
  useClass: AddressRepository,
};
