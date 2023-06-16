import { Inject, Injectable } from '@nestjs/common';

import { InterfaceUseCase } from '@shared/useCase.interface';
import { CreateUserDTO, CreateUserResponse } from './createUserTypes';
import { USER_REPOSITORY_PROVIDER } from '@src/constants';
import { IUserRepository } from '@modules/user/repository/userRepository.interface';
import { EmailAlreadyExistsError } from './createUserError';
import { PASSWORD_HASH_PROVIDER } from '@src/constants';
import { InterfacePasswordHash } from '@modules/user/provider/passwordHash/passwordHash.interface';

import * as validation from '@shared/util/validation';
import { ValidationInputError } from '@shared/validationError';

@Injectable()
export class CreateUserUseCase
  implements
    InterfaceUseCase<
      CreateUserDTO,
      Promise<
        CreateUserResponse | EmailAlreadyExistsError | ValidationInputError
      >
    >
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: IUserRepository,
    @Inject(PASSWORD_HASH_PROVIDER)
    private encryptService: InterfacePasswordHash,
  ) {}

  public async execute({
    email,
    password,
    username,
  }: CreateUserDTO): Promise<
    CreateUserResponse | EmailAlreadyExistsError | ValidationInputError
  > {
    if (validation.againstNullOrUndefined(username)) {
      return new ValidationInputError('Nome de usuário obrigatório');
    }

    if (validation.againstNullOrUndefined(email)) {
      return new ValidationInputError('Email obrigatório');
    }

    if (validation.againstNullOrUndefined(password)) {
      return new ValidationInputError('password obrigatório');
    }

    if (username.length < 4) {
      return new ValidationInputError(
        'Nome de usuário pelo menos 4 caracteres',
      );
    }

    if (username.length > 15) {
      return new ValidationInputError(
        'Nome de usuário no máximo 15 caracteres',
      );
    }

    if (password.length < 6) {
      return new ValidationInputError('Senha deve ter pelo menos 6 caracteres');
    }

    if (!validation.isValidEmail(email)) {
      return new ValidationInputError('Email inválido');
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return new EmailAlreadyExistsError(email);
    }

    const passwordHashed = await this.encryptService.generateHash(password);
    await this.userRepository.save({
      email,
      password: passwordHashed,
      username,
    });
    return {
      email,
      username,
    };
  }
}
