import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

import { randomUUID, createHash, randomBytes } from 'crypto';
import { SessionClient } from './session';
const RedisStore = connectRedis(session);

const redisClient = new SessionClient();
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
      genid: function (req) {
        return createHash('sha256')
          .update(randomUUID())
          .update(randomBytes(256))
          .digest('hex');
      },
      cookie: {
        maxAge: 6000000,
      },
    }),
  );
  await app.listen(3000);
  console.log('Starting on Port', 3000);
}
//ClusterService.clusterize(bootstrap);

bootstrap();
