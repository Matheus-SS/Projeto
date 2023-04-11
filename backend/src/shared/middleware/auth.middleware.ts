import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ISession, SessionClient } from 'src/session';
import { BaseController } from '../http/baseController';

@Injectable()
export class AuthMiddleware extends BaseController implements NestMiddleware {
  constructor(
    @Inject(SessionClient)
    private sessionClient: ISession,
  ) {
    super();
  }
  async use(request: Request, response: Response, next: NextFunction) {
    if (request.sessionID && request.session.authenticated) {
      try {
        const userSession = request.headers.cookie
          .split(' ')
          .find((value) => value.includes('user_session'));
        const cookieSessionId = userSession.split('=')[1];

        console.log('cookies');
        const redisSessionId = await this.sessionClient.getValue(
          `sess:${cookieSessionId.split(';')[0]}`,
        );

        if (!redisSessionId) {
          response.clearCookie('PROJETO_SESSION_ID');
          response.clearCookie('user_session');
        }
        return next();
        // verificar se a sessao existe no redis senao limpar cookie
      } catch (error) {
        request.session.destroy((err) => {
          if (err) {
            console.log('erro ao sair da sessão');
          }
          console.log('destruindo sessão');
        });
        response.clearCookie('PROJETO_SESSION_ID');
        response.clearCookie('user_session');
        return this.unAuthorized(response, 'Não autorizado');
      }
    }
  }
}
