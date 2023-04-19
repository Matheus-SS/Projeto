import { Controller, Delete, Inject, Req, Res } from '@nestjs/common';
import { BaseController } from '../../../../shared/http/baseController';
import { LOGOUT_USER_PROVIDER } from '../../../../constants';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import * as logoutError from './logoutUserError';
import { Either } from '../../../../shared/core/Result';
import { Request, Response } from 'express';

@Controller('user')
export class LogoutUserController extends BaseController {
  constructor(
    @Inject(LOGOUT_USER_PROVIDER)
    private logoutUserUseCase: InterfaceUseCase<
      string,
      Promise<Either<logoutError.LogoutNotFoundError, boolean>>
    >,
  ) {
    super();
  }

  @Delete('session/logout')
  public async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.logoutUserUseCase.execute(request.sessionID);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case logoutError.LogoutNotFoundError:
            return this.notFound(response, error.message);
          default:
            return this.internalError(response, error.message);
        }
      } else {
        response.clearCookie('PROJETO_SESSION_ID');
        response.clearCookie('user_session');
        return this.ok(response, 'Logout concluído');
      }
    } catch (error) {
      return this.internalError(response, error.message);
    }
  }
}
