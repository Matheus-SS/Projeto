import { Module } from '@nestjs/common';
import { PasswordHashProvider } from '../provider/passwordHash/passwordHash.provider';
import { UserRepositoryModule } from '../repository/userRespository.module';
import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserProvider } from './createUser/createUser.provider';
import { LoginUserController } from './loginUser/loginUser.controller';

@Module({
  imports: [UserRepositoryModule],
  providers: [PasswordHashProvider, CreateUserProvider],
  controllers: [CreateUserController, LoginUserController],
})
export class UserModule {}
