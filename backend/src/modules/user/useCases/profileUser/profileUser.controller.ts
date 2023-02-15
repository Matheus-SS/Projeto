import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { PROFILE_USER_PROVIDER } from '../../../../constants';
import { BaseController } from '../../../../shared/http/baseController';
import { Request, Response } from 'express';
import { ProfileUserUseCaseResponse } from './profileUserUseCaseResponse';
import { ProfileUserError } from './profileUserError';

@Controller('user')
export class ProfileUserController extends BaseController {
  constructor(
    @Inject(PROFILE_USER_PROVIDER)
    private profileUserUseCase: InterfaceUseCase<
      string,
      Promise<ProfileUserUseCaseResponse>
    >,
  ) {
    super();
  }

  @Get('/profile')
  async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.profileUserUseCase.execute(
        request.session.user.email,
      );

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case ProfileUserError.ProfileNotFoundError:
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
