import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../baseController';
import { FIND_SESSION_QUERY_PROVIDER } from '@src/constants';
import { InterfaceQuery } from '@shared/query.interface';
import { ISession } from '@modules/session/repository/sessionRepository.interface';
import { verifyJWT } from '@shared/util/jwt';

@Injectable()
export class AuthMiddleware extends BaseController implements NestMiddleware {
  constructor(
    @Inject(FIND_SESSION_QUERY_PROVIDER)
    private findSession: InterfaceQuery<string, Promise<ISession>>,
  ) {
    super();
  }
  async use(request: Request, response: Response, next: NextFunction) {
    let token;
    if (request.headers.cookie) {
      try {
        token = request.headers.cookie.split('=')[1];

        const { id } = verifyJWT(token);

        const session = await this.findSession.execute(id);
        request.userId = session.user_id;
        next();
      } catch (error: any) {
        console.error(error);
        response.status(401);
        response.json({ message: 'Não autorizado, falha no token' });
      }
    }

    if (!token) {
      response.status(401);
      response.json({ message: 'Não autorizado, falha no token ' });
    }
  }
}
