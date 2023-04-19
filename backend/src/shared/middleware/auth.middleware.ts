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

        const redisSessionId = await this.sessionClient.getValue(
          `sess:${cookieSessionId.split(';')[0]}`,
        );

        // quando altera user_session
        if (!redisSessionId) {
          throw new Error('Sessão não encontrada');
        }
        return next();
      } catch (error) {
        // verificar se a sessao existe no redis senao limpar cookie
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
    } else {
      // quando altera o projeto session id
      response.clearCookie('user_session');
      response.clearCookie('PROJETO_SESSION_ID');
      return this.unAuthorized(response, 'Não autorizado');
    }
  }
}
