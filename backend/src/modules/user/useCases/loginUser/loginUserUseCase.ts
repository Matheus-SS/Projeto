import { Inject } from '@nestjs/common';
import { AppError } from '../../../../shared/core/appError';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { left, right } from '../../../../shared/core/Result';
import { Email } from '../../entity/Email';
import { Password } from '../../entity/Password';
import { PASSWORD_HASH_PROVIDER } from '../../provider/constants';
import { InterfacePasswordHash } from '../../provider/passwordHash/passwordHash.interface';
import { USER_REPOSITORY_PROVIDER } from '../../repository/constants';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { LoginUserDTO } from './loginUserDTO';
import { LoginUserError } from './loginUserError';
import { LoginUserUseCaseResponse } from './loginUserUseCaseResponse';

export class LoginUserUseCase
  implements InterfaceUseCase<LoginUserDTO, Promise<LoginUserUseCaseResponse>>
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: InterfaceUserRepository,
    @Inject(PASSWORD_HASH_PROVIDER)
    private passwordHashProvider: InterfacePasswordHash,
  ) {}
  public async execute({
    email,
    password,
  }: LoginUserDTO): Promise<LoginUserUseCaseResponse> {
    const emailOrFail = Email.create(email);
    const passwordOrFail = Password.create(password);
    if (emailOrFail.failure) {
      return left(new AppError.DomainError(emailOrFail.error.toString()));
    }

    if (passwordOrFail.failure) {
      return left(new AppError.DomainError(passwordOrFail.error.toString()));
    }

    const user = await this.userRepository.findByEmail(
      emailOrFail.getValue().getValue,
    );

    if (!user) {
      return left(new LoginUserError.EmailOrPasswordIncorrectError());
    }

    const passwordMatch = await this.passwordHashProvider.comparePassword(
      passwordOrFail.getValue().getValue,
      user.getPassword.getValue,
    );

    if (!passwordMatch) {
      return left(new LoginUserError.EmailOrPasswordIncorrectError());
    }

    return right(user.getProps);
  }
}
