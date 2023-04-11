import { Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';

import { UserModule } from './modules/user/useCases/user.module';
import { SessionClient } from './session';
import { AuthMiddleware } from './shared/middleware/auth.middleware';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [SessionClient],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/v1/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/user/create',
          method: RequestMethod.POST,
        },
      ) // exclui rotas que não queremos aplicar autenticação
      .forRoutes('*');
  }
}
