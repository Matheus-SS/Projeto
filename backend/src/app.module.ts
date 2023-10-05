import 'reflect-metadata';
import { Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { UserModule } from './modules/user/useCases/user.module';
import { SessionModule } from '@modules/session/session.module';
import { ProductModule } from '@modules/product/product.module';
import { CartModule } from '@modules/cart/cart.module';
import { DatabaseLoggerMiddleware } from '@shared/middleware/databaseLogger.middeware';
import { LogRepositoryModule } from '@infra/repository/log/logRepository.module';
import { AddressModule } from '@modules/address/Address.module';

@Module({
  imports: [
    SessionModule,
    UserModule,
    ProductModule,
    CartModule,
    LogRepositoryModule,
    AddressModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DatabaseLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/user',
          method: RequestMethod.POST,
        },
        {
          path: '/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/session',
          method: RequestMethod.GET,
        },
        {
          path: '/product',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
