import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { InputInterceptor } from '@shared/interceptors/input.interceptor';
import { config } from '@shared/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: config.CORS_ORIGIN,
    },
  });

  app.use(helmet());
  app.useGlobalInterceptors(new InputInterceptor());

  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
  console.log('Starting on Port', 3000);
}
//ClusterService.clusterize(bootstrap);

bootstrap();
