import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { InputInterceptor } from '@shared/interceptors/input.interceptor';
import { contract } from './contract';
import { generateOpenApi } from '@ts-rest/open-api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:8080',
    },
  });
  const document = generateOpenApi(
    contract,
    {
      info: {
        title: 'Projeto API',
        version: '1.0.0',
      },
    },
    {
      setOperationId: true,
    },
  );

  SwaggerModule.setup('docs', app, document);
  app.useGlobalInterceptors(new InputInterceptor());
  app.use(helmet());
  // app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
  console.log('Starting on Port', 3000);
}
//ClusterService.clusterize(bootstrap);

bootstrap();
