import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { CREATE_USER_USE_CASE_PROVIDER, USER_ROUTE } from '@src/constants';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { EmailAlreadyExistsError } from './createUserError';
import { Response } from 'express';
import { BaseController } from '@shared/baseController';
import { ValidationInputError } from '@shared/validationError';
import { CreateUserDTO, CreateUserResponse } from './createUserTypes';

@Controller(USER_ROUTE)
export class CreateUserController extends BaseController {
  constructor(
    @Inject(CREATE_USER_USE_CASE_PROVIDER)
    private createUser: InterfaceUseCase<
      CreateUserDTO,
      Promise<
        CreateUserResponse | EmailAlreadyExistsError | ValidationInputError
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
        email: email.trim(),
        password: password.trim(),
        username: username.trim(),
      });

      if (result instanceof ValidationInputError) {
        return this.badRequest(response, result.message);
      }
      if (result instanceof EmailAlreadyExistsError) {
        return this.conflict(response, result.message);
      }

      return this.created(response);
    } catch (error: any) {
      return this.badRequest(response, error.message);
    }
  }
}
