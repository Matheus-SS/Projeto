import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import { AddressRepositoryProvider } from './addressRepository.provider';

@Module({
  imports: [DatabaseModule],
  providers: [AddressRepositoryProvider],
  exports: [AddressRepositoryProvider],
})
export class AddressRepositoryModule {}
