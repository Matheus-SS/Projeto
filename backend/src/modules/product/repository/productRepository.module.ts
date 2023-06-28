import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProductRepositoryProvider } from './productRepository.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ProductRepositoryProvider],
  exports: [ProductRepositoryProvider],
})
export class ProductRepositoryModule {}
