import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClusterService } from './cluster.service';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IoRedis from 'ioredis';

const RedisStore = connectRedis(session);

const redisClient = new IoRedis('redis://localhost:6379');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:8080',
    },
  });
  app.setGlobalPrefix('/api/v1');
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      name: 'PROJETO_SESSION_ID',
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  await app.listen(3000);
  console.log('Starting on Port', 3000);
}
//ClusterService.clusterize(bootstrap);

bootstrap();
