import 'reflect-metadata';
import { Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { UserModule } from './modules/user/useCases/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/api/v1/user',
        method: RequestMethod.POST,
      }) // exclui rotas que não queremos aplicar autenticação
      .forRoutes('*');
  }
}
