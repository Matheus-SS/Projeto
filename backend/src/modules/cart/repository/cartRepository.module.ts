import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import { CartRepositoryProvider } from './cartRepository.provider';

@Module({
  imports: [DatabaseModule],
  providers: [CartRepositoryProvider],
  exports: [CartRepositoryProvider],
})
export class CartRepositoryModule {}
