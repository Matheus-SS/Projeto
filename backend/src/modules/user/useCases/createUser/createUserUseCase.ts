import { UserEntity } from '../../entity/User';
import { Inject, Injectable } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { USER_REPOSITORY_PROVIDER } from '../../repository/constants';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { left, right } from '../../../../shared/core/Result';
import { CreateUserError } from './createUserError';
import { AppError } from '../../../../shared/core/appError';
import { CreateUserDTO } from './createUserDTO';
import { CreateUserUseCaseResponse } from './createUserUseCaseResponse';
import { InterfacePasswordHash } from '../../provider/passwordHash/passwordHash.interface';
import { PASSWORD_HASH_PROVIDER } from '../../provider/constants';
@Injectable()
export class CreateUserUseCase
  implements
    InterfaceUseCase<CreateUserDTO, Promise<CreateUserUseCaseResponse>>
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: InterfaceUserRepository,
    @Inject(PASSWORD_HASH_PROVIDER)
    private passwordHashProvider: InterfacePasswordHash,
  ) {}
  public async execute(
    createUser: CreateUserDTO,
  ): Promise<CreateUserUseCaseResponse> {
    const userOrFail = UserEntity.createUser(createUser);

    if (userOrFail.failure) {
      return left(new AppError.DomainError(userOrFail.error.toString()));
    }

    const hashedPassword = await this.passwordHashProvider.generateHash(
      userOrFail.getValue().getPassword.getValue,
    );

    userOrFail.getValue().getPassword.setPassword = hashedPassword;

    const email = userOrFail.getValue().getEmail.getValue;

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      return left(new CreateUserError.EmailAlreadyExistsError(email));
    }
    const user = await this.userRepository.createUser(userOrFail.getValue());

    return right(user);
  }
}
