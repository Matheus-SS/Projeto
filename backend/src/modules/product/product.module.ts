import { Module } from '@nestjs/common';
import { ProductRepositoryModule } from './repository/productRepository.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateProductUseCaseProvider } from './useCases/createProduct/createProduct.provider';
import { CreateProductController } from './useCases/createProduct/createProduct.controller';

@Module({
  imports: [DatabaseModule, ProductRepositoryModule],
  providers: [CreateProductUseCaseProvider],
  controllers: [CreateProductController],
})
export class ProductModule {}
