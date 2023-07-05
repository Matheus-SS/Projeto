import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CartRepositoryModule } from './repository/cartRepository.module';
import { AddUpdateCartUseCaseProvider } from './useCases/addCart/addCart.provider';
import { AddCartController } from './useCases/addCart/addCart.controller';
import { ProductRepositoryModule } from '@modules/product/repository/productRepository.module';

@Module({
  imports: [DatabaseModule, CartRepositoryModule, ProductRepositoryModule],
  providers: [AddUpdateCartUseCaseProvider],
  controllers: [AddCartController],
})
export class CartModule {}
