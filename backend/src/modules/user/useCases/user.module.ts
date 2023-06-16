import { Module } from '@nestjs/common';

import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserUseCaseProvider } from './createUser/createUserUseCase.provider';
import { UserRepositoryModule } from '../repository/userRespository.module';
import { DatabaseModule } from '@infra/database/database.module';
import { PasswordHashProvider } from '@modules/user/provider/passwordHash/passwordHash.provider';

@Module({
  imports: [DatabaseModule, UserRepositoryModule],
  providers: [CreateUserUseCaseProvider, PasswordHashProvider],
  controllers: [CreateUserController],
})
export class UserModule {}
