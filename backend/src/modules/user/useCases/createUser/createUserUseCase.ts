import { UserEntity } from '../../entity/User';
import { Inject, Injectable } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { USER_REPOSITORY_PROVIDER } from '../../repository/constants';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { left, right } from '../../../../shared/core/Result';
import { CreateUserError } from './createUserError';
import { AppError } from 'src/shared/core/appError';
import { CreateUserDTO } from './createUserDTO';
import { CreateUserUseCaseResponse } from './createUserUseCaseResponse';
@Injectable()
export class CreateUserUseCase
  implements
    InterfaceUseCase<CreateUserDTO, Promise<CreateUserUseCaseResponse>>
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: InterfaceUserRepository,
  ) {}
  public async execute(
    createUser: CreateUserDTO,
  ): Promise<CreateUserUseCaseResponse> {
    const userOrFail = UserEntity.createUser(createUser);

    if (userOrFail.failure) {
      return left(new AppError.DomainError(userOrFail.error.toString()));
    }
    const email = userOrFail.getValue().getEmail;

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      return left(new CreateUserError.EmailAlreadyExistsError(email));
    }
    const user = await this.userRepository.createUser(userOrFail.getValue());

    return right(user);
  }
}
