import { Inject, Injectable } from '@nestjs/common';

import { InterfaceUseCase } from '@shared/useCase.interface';
import { CreateUserDTO, CreateUserResponse } from './createUserTypes';
import { USER_REPOSITORY_PROVIDER } from '@src/constants';
import { IUserRepository } from '@modules/user/repository/userRepository.interface';
import { EmailAlreadyExistsError } from './createUserError';
import { PASSWORD_HASH_PROVIDER } from '@src/constants';
import { InterfacePasswordHash } from '@modules/user/provider/passwordHash/passwordHash.interface';

import { ValidationInputError } from '@shared/validationError';

import { z } from 'zod';
import { ReturnType } from '@shared/returnType';

@Injectable()
export class CreateUserUseCase
  implements
    InterfaceUseCase<
      CreateUserDTO,
      Promise<
        ReturnType<
          ValidationInputError | EmailAlreadyExistsError,
          CreateUserResponse
        >
      >
    >
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: IUserRepository,
    @Inject(PASSWORD_HASH_PROVIDER)
    private encryptService: InterfacePasswordHash,
  ) {}

  public validateInput({ email, password, username }: CreateUserDTO):
    | {
        error: ValidationInputError;
        success: boolean;
      }
    | {
        error?: ValidationInputError;
        success: boolean;
      } {
    const userSchema = z.object({
      username: z
        .string({
          required_error: 'Nome de usuário obrigatório',
        })
        .min(4, 'Nome de usuário pelo menos 4 caracteres')
        .max(15, 'Nome de usuário no máximo 15 caracteres'),
      email: z
        .string({
          required_error: 'Email obrigatório',
        })
        .email({
          message: 'Email inválido',
        }),
      password: z
        .string({
          required_error: 'Password obrigatório',
        })
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    });

    const results = userSchema.safeParse({ username, email, password });

    if (results.success === false) {
      const { issues } = results.error;
      return {
        error: new ValidationInputError(issues[0].message),
        success: false,
      };
    } else {
      return {
        success: true,
      };
    }
  }

  public async execute({
    email,
    password,
    username,
  }: CreateUserDTO): Promise<
    ReturnType<
      ValidationInputError | EmailAlreadyExistsError,
      CreateUserResponse
    >
  > {
    this.validateInput({ email, password, username });

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return { error: new EmailAlreadyExistsError(email), success: false };
    }

    const passwordHashed = await this.encryptService.generateHash(password);

    await this.userRepository.create({
      email,
      password: passwordHashed,
      username,
    });

    return {
      data: {
        email,
        username,
      },
      success: true,
    };
  }
}
