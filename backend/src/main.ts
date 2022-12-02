import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClusterService } from './cluster.service';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      name:'PROJETO_SESSION_ID',
      cookie: {
        maxAge: 30000
      }
    }),
  );
  await app.listen(3000);
  console.log('Starting on Port', 3000);
}
//ClusterService.clusterize(bootstrap);

bootstrap();
