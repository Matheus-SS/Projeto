import { Module } from '@nestjs/common';
import { ProductRepositoryModule } from './repository/productRepository.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateProductUseCaseProvider } from './useCases/createProduct/createProduct.provider';
import { CreateProductController } from './useCases/createProduct/createProduct.controller';
import { ProductQueryController } from './productQuery.controller';
import { ListProductQueryProvider } from './query/listProduct/listProductQuery.provider';

@Module({
  imports: [DatabaseModule, ProductRepositoryModule],
  providers: [CreateProductUseCaseProvider, ListProductQueryProvider],
  controllers: [CreateProductController, ProductQueryController],
})
export class ProductModule {}
