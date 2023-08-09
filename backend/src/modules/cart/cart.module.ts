import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CartRepositoryModule } from './repository/cartRepository.module';
import { AddUpdateCartUseCaseProvider } from './useCases/addCart/addCart.provider';
import { AddCartController } from './useCases/addCart/addCart.controller';
import { ProductRepositoryModule } from '@modules/product/repository/productRepository.module';
import { CartQueryController } from './cartQuery.controller';
import { ListMyCartQueryProvider } from './query/listMyCartQuery.provider';
import { UpdateItemCartUseCase } from './useCases/updateItemCart/updateItemCartUseCase';
import { UpdateItemCartController } from './useCases/updateItemCart/updateItemCart.controller';

@Module({
  imports: [DatabaseModule, CartRepositoryModule, ProductRepositoryModule],
  providers: [
    AddUpdateCartUseCaseProvider,
    ListMyCartQueryProvider,
    UpdateItemCartUseCase,
  ],
  controllers: [
    AddCartController,
    CartQueryController,
    UpdateItemCartController,
  ],
})
export class CartModule {}
