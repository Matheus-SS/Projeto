import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository/userRespository.module';
import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserProvider } from './createUser/createUser.provider';

@Module({
  imports: [UserRepositoryModule],
  providers: [CreateUserProvider],
  controllers: [CreateUserController],
})
export class UserModule {}
