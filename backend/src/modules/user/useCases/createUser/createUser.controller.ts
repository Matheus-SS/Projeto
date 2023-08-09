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

  // @Post()
  // public async executeImpl(
  //   @Body() { email, password, username }: CreateUserDTO,
  //   @Res() response: Response,
  // ): Promise<Response> {
  //   try {
  //     const result = await this.createUser.execute({
  //       email: email,
  //       password: password,
  //       username: username,
  //     });

  //     if (result.success === false) {
  //       switch (result.error.name) {
  //         case 'EmailAlreadyExistsError':
  //           return this.badRequest(response, result.error.message);
  //         case 'ValidationInputError':
  //           return this.badRequest(response, result.error.message);
  //       }
  //     } else {
  //       return this.created(response);
  //     }
  //   } catch (error: any) {
  //     console.error('CreateUserController', error);
  //     return this.internalError(response, error.message);
  //   }
  // }

  @TsRestHandler(contract.createUser)
  async execImpl() {
    return tsRestHandler(contract.createUser, async ({ body }) => {
      console.log(body);
      const result = await this.createUser.execute({
        email: body.email,
        password: body.password,
        username: body.username,
      });
      if (result.success === false) {
        switch (result.error.name) {
          case 'EmailAlreadyExistsError':
            return {
              body: {
                name: 'EmailAlreadyExistsError',
                message: result.error.message,
              },
              status: 409,
            };
        }
      } else {
        return { body: 'ok', status: 201 };
      }
    });
  }
}
