import { Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { LOGIN_USER_PROVIDER } from '../../../../constants';
import { BaseController } from '../../../../shared/http/baseController';
import { LoginUserDTO } from './loginUserDTO';
import { LoginUserUseCaseResponse } from './loginUserUseCaseResponse';
import { AppError } from 'src/shared/core/appError';
import { Request, Response } from 'express';
import { LoginUserError } from './loginUserError';

@Controller('user')
export class LoginUserController extends BaseController {
  constructor(
    @Inject(LOGIN_USER_PROVIDER)
    private loginUserUseCase: InterfaceUseCase<
      LoginUserDTO,
      Promise<LoginUserUseCaseResponse>
    >,
  ) {
    super();
  }

  @Post('/login')
  async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const body: LoginUserDTO = request.body as LoginUserDTO;

    try {
      const result = await this.loginUserUseCase.execute(body);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AppError.DomainError:
            return this.badRequest(response, error.message);
          case LoginUserError.EmailOrPasswordIncorrectError:
            return this.badRequest(response, error.message);
          default:
            return this.internalError(response, error.message);
        }
      } else {
        const userData = {
          email: body.email,
          username: result.value.username,
        };
        request.session.user = {
          ...userData,
        };
        request.session.authenticated = true;
        response.cookie('user_session', request.sessionID, { httpOnly: false });
        return this.ok(response, userData);
      }
    } catch (error) {
      return this.internalError(response, error.message);
    }
  }

  @Get('/list')
  async list(@Req() request: Request, @Res() response: Response) {
    console.log(request.session);
    return this.ok(response, 'lista');
  }
}
