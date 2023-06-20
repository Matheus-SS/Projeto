import { Module } from '@nestjs/common';

import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserUseCaseProvider } from './createUser/createUserUseCase.provider';
import { UserRepositoryModule } from '../repository/userRespository.module';
import { DatabaseModule } from '@infra/database/database.module';
import { PasswordHashProvider } from '@modules/user/provider/passwordHash/passwordHash.provider';
import { LoginUserController } from './loginUser/loginUser.controller';
import { LoginUserUseCaseProvider } from './loginUser/loginUserUseCase.provider';
import { SessionRepositoryModule } from '@modules/session/repository/sessionRepository.module';

@Module({
  imports: [DatabaseModule, UserRepositoryModule, SessionRepositoryModule],
  providers: [
    CreateUserUseCaseProvider,
    LoginUserUseCaseProvider,
    PasswordHashProvider,
  ],
  controllers: [CreateUserController, LoginUserController],
})
export class UserModule {}
