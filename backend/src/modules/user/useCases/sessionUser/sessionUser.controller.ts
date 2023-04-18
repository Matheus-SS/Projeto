import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { SESSION_USER_PROVIDER } from '../../../../constants';
import { BaseController } from '../../../../shared/http/baseController';
import { Request, Response } from 'express';
import { ProfileUserUseCaseResponse } from './sessionUserUseCaseResponse';
import { SessionUserError } from './sessionUserError';

@Controller('user')
export class SessionUserController extends BaseController {
  constructor(
    @Inject(SESSION_USER_PROVIDER)
    private sessionUserUseCase: InterfaceUseCase<
      string,
      Promise<ProfileUserUseCaseResponse>
    >,
  ) {
    super();
  }

  @Get('session')
  async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.sessionUserUseCase.execute(request.sessionID);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case SessionUserError.SessionNotFoundError:
            return this.notFound(response, error.message);
          default:
            return this.internalError(response, error.message);
        }
      } else {
        return this.ok(response, result.value);
      }
    } catch (error) {
      return this.internalError(response, error.message);
    }
  }
}
