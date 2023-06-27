import { Controller, Inject, Res, Get, Post, Req } from '@nestjs/common';

import { Request, Response } from 'express';
import { BaseController } from '@shared/baseController';
import { FIND_SESSION_QUERY_PROVIDER, SESSION_ROUTE } from '@src/constants';
import { InterfaceQuery } from '@shared/query.interface';
import { IFindSession } from './query/dto/findSessionDTO';
import { verifyJWT } from '@shared/util/jwt';

@Controller(SESSION_ROUTE)
export class SessionController extends BaseController {
  constructor(
    @Inject(FIND_SESSION_QUERY_PROVIDER)
    private findSession: InterfaceQuery<string, Promise<IFindSession[]>>,
  ) {
    super();
  }

  @Get('/')
  public async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    if (request.headers.cookie) {
      try {
        const token = request.headers.cookie.split('=')[1];

        const { id } = verifyJWT(token);

        const session = await this.findSession.execute(id);
        return response.status(200).json({
          user: {
            username: session[0].username.trim(),
            email: session[0].email.trim(),
          },
        });
      } catch (error: any) {
        response.status(401);
        response.clearCookie('token');
        response.json({ message: 'Não autorizado, falha no token' });
      }
    }

    return response.status(200).json();
  }
}
