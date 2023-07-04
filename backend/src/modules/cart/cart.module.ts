import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CartRepositoryModule } from './repository/cartRepository.module';
import { AddToCartUseCaseProvider } from './useCases/addToCart/addToCart.provider';
import { AddToCartController } from './useCases/addToCart/addToCart.controller';

@Module({
  imports: [DatabaseModule, CartRepositoryModule],
  providers: [AddToCartUseCaseProvider],
  controllers: [AddToCartController],
})
export class CartModule {}
