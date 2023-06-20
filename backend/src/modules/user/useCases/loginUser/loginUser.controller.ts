import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import {
  EXPIRES_IN_COOKIE,
  LOGIN_USER_USE_CASE_PROVIDER,
  USER_ROUTE,
} from '@src/constants';
import { InterfaceUseCase } from '@shared/useCase.interface';
import { Response } from 'express';
import { BaseController } from '@shared/baseController';
import { ValidationInputError } from '@shared/validationError';
import { LoginUserDTO, LoginUserResponse } from './loginUserTypes';
import { LoginUserError } from './loginUserError';

@Controller(USER_ROUTE)
export class LoginUserController extends BaseController {
  constructor(
    @Inject(LOGIN_USER_USE_CASE_PROVIDER)
    private loginUser: InterfaceUseCase<
      LoginUserDTO,
      Promise<LoginUserResponse | LoginUserError | ValidationInputError>
    >,
  ) {
    super();
  }

  @Post('/login')
  public async executeImpl(
    @Body() { email, password }: LoginUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.loginUser.execute({
        email: email.trim(),
        password: password.trim(),
      });

      if (result instanceof ValidationInputError) {
        return this.badRequest(response, result.message);
      }
      if (result instanceof LoginUserError) {
        return this.notFound(response, result.message);
      }
      response.cookie('token', result.token, {
        httpOnly: true,
        maxAge: EXPIRES_IN_COOKIE,
        domain: 'localhost',
      });
      return this.ok(response, result);
    } catch (error: any) {
      return this.badRequest(response, error.message);
    }
  }
}
