import { Controller, Inject, Res, Req, Delete } from '@nestjs/common';

import { Request, Response } from 'express';
import { BaseController } from '@shared/baseController';
import {
  DELETE_SESSION_USE_CASE_PROVIDER,
  SESSION_ROUTE,
} from '@src/constants';
import { InterfaceQuery } from '@shared/query.interface';
import { verifyJWT } from '@shared/util/jwt';
import { SessionNotFoundError } from './deleteSessionError';

@Controller(SESSION_ROUTE)
export class DeleteSessionController extends BaseController {
  constructor(
    @Inject(DELETE_SESSION_USE_CASE_PROVIDER)
    private deleteSession: InterfaceQuery<
      string,
      Promise<void | SessionNotFoundError>
    >,
  ) {
    super();
  }

  @Delete('/logout')
  public async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    if (request.headers.cookie) {
      try {
        const token = request.headers.cookie.split('=')[1];

        const { id } = verifyJWT(token);

        const result = await this.deleteSession.execute(id);

        if (result instanceof SessionNotFoundError) {
          return this.badRequest(response, result.message);
        }
        response.clearCookie('token');
        return response.status(200).json();
      } catch (error: any) {
        response.clearCookie('token');
        return this.badRequest(response, error.message);
      }
    }
  }
}
