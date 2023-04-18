import { Module } from '@nestjs/common';
import { PasswordHashProvider } from '../provider/passwordHash/passwordHash.provider';
import { UserRepositoryModule } from '../repository/userRespository.module';
import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserProvider } from './createUser/createUser.provider';
import { LoginUserController } from './loginUser/loginUser.controller';
import { LoginUserProvider } from './loginUser/loginUser.provider';
import { SessionUserController } from './sessionUser/sessionUser.controller';
import { SessionUserProvider } from './sessionUser/sessionUser.provider';
import { SessionClient } from '../../../session';

@Module({
  imports: [UserRepositoryModule],
  providers: [
    PasswordHashProvider,
    CreateUserProvider,
    LoginUserProvider,
    SessionUserProvider,
    SessionClient,
  ],
  controllers: [
    CreateUserController,
    LoginUserController,
    SessionUserController,
  ],
})
export class UserModule {}
