import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { CREATE_USER_USE_CASE_PROVIDER, USER_ROUTE } from '@src/constants';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { EmailAlreadyExistsError } from './createUserError';
import { Response } from 'express';
import { BaseController } from '@shared/baseController';
import { ValidationInputError } from '@shared/validationError';
import { CreateUserDTO, CreateUserResponse } from './createUserTypes';
import { ReturnType } from '@shared/returnType';
import { contract } from '@src/contract';
@Controller()
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE_PROVIDER)
    private createUser: InterfaceUseCase<
      CreateUserDTO,
      Promise<
        ReturnType<
          ValidationInputError | EmailAlreadyExistsError,
          CreateUserResponse
        >
      >
    >,
  ) {}

  @TsRestHandler(contract.createUser)
  async execImpl() {
    return tsRestHandler(contract.createUser, async ({ body }) => {
      try {
        const result = await this.createUser.execute({
          email: body.email,
          password: body.password,
          username: body.username,
        });
        if (result.success === false) {
          if (result.error.name === 'EmailAlreadyExistsError') {
            return {
              body: {
                name: 'EmailAlreadyExistsError',
                message: result.error.message,
              },
              status: 409,
            };
          } else if (result.error.name === 'ValidationInputError') {
            return {
              body: {
                name: 'ValidationInputError',
                message: result.error.message,
              },
              status: 400,
            };
          }
        } else {
          return { body: 'ok', status: 201 };
        }
      } catch (error: any) {
        console.log(error);
        return {
          body: {
            name: 'InternalServerError',
            message: error.toString(),
          },
          status: 500,
        };
      }
    });
  }
}
