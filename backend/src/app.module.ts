import 'reflect-metadata';
import { Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { UserModule } from './modules/user/useCases/user.module';
import { SessionModule } from '@modules/session/session.module';
import { ProductModule } from '@modules/product/product.module';
import { CartModule } from '@modules/cart/cart.module';
import { LoggingInterceptor } from '@shared/interceptors/logging.interceptor';
import { LogRepositoryModule } from '@infra/repository/log/logRepository.module';

@Module({
  imports: [
    SessionModule,
    UserModule,
    ProductModule,
    CartModule,
    LogRepositoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/v1/user',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/session',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/product',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
