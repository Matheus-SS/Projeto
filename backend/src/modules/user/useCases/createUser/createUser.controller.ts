import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { CREATE_USER_USE_CASE_PROVIDER, USER_ROUTE } from '@src/constants';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { EmailAlreadyExistsError } from './createUserError';
import { Response } from 'express';
import { BaseController } from '@shared/baseController';
import { ValidationInputError } from '@shared/validationError';
import { CreateUserDTO, CreateUserResponse } from './createUserTypes';
import { ReturnType } from '@shared/returnType';

@Controller(USER_ROUTE)
export class CreateUserController extends BaseController {
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
  ) {
    super();
  }

  @Post()
  public async executeImpl(
    @Body() { email, password, username }: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.createUser.execute({
        email: email,
        password: password,
        username: username,
      });

      if (result.success === false) {
        switch (result.error.name) {
          case 'EmailAlreadyExistsError':
            return this.badRequest(response, result.error.message);
          case 'ValidationInputError':
            return this.badRequest(response, result.error.message);
        }
      } else {
        return this.created(response);
      }
    } catch (error: any) {
      console.error('CreateUserController', error);
      return this.internalError(response, error.message);
    }
  }
}
