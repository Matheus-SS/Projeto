import { Inject, Injectable } from '@nestjs/common';

import { InterfaceUseCase } from '@shared/useCase.interface';
import {
  SESSION_REPOSITORY_PROVIDER,
  USER_REPOSITORY_PROVIDER,
} from '@src/constants';
import { IUserRepository } from '@modules/user/repository/userRepository.interface';
import { PASSWORD_HASH_PROVIDER } from '@src/constants';
import { InterfacePasswordHash } from '@modules/user/provider/passwordHash/passwordHash.interface';

import * as validation from '@shared/util/validation';
import { ValidationInputError } from '@shared/validationError';
import { LoginUserError } from './loginUserError';
import { LoginUserDTO, LoginUserResponse } from './loginUserTypes';
import { ISessionRepository } from '@modules/session/repository/sessionRepository.interface';
import { generateToken } from '@shared/util/jwt';

@Injectable()
export class LoginUserUseCase
  implements
    InterfaceUseCase<
      LoginUserDTO,
      Promise<LoginUserResponse | LoginUserError | ValidationInputError>
    >
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: IUserRepository,
    @Inject(SESSION_REPOSITORY_PROVIDER)
    private sessionRepository: ISessionRepository,
    @Inject(PASSWORD_HASH_PROVIDER)
    private encryptService: InterfacePasswordHash,
  ) {}

  public async execute({
    email,
    password,
  }: LoginUserDTO): Promise<
    LoginUserResponse | LoginUserError | ValidationInputError
  > {
    if (validation.againstNullOrUndefined(email)) {
      return new ValidationInputError('Email obrigatório');
    }

    if (validation.againstNullOrUndefined(password)) {
      return new ValidationInputError('password obrigatório');
    }

    if (password.length < 6) {
      return new ValidationInputError('Senha deve ter pelo menos 6 caracteres');
    }

    if (!validation.isValidEmail(email)) {
      return new ValidationInputError('Email inválido');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return new LoginUserError();
    }

    const passwordMatched = await this.encryptService.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatched) {
      return new LoginUserError();
    }

    const session = await this.sessionRepository.create({ user_id: user.id });

    return {
      token: generateToken(session.id),
      user: {
        username: user.username.trim(),
        email: email.trim(),
      },
    };
  }
}
