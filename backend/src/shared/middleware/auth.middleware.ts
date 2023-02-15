import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../http/baseController';

@Injectable()
export class AuthMiddleware extends BaseController implements NestMiddleware {
  constructor() {
    super();
  }
  use(request: Request, response: Response, next: NextFunction) {
    console.log(request.session);
    if (request.session && request.session.authenticated) {
      return next();
    }

    request.session.destroy((err) => {
      if (err) {
        console.log('erro ao sair da sessão');
      }
      console.log('destruindo sessão');
    });
    response.clearCookie('PROJETO_SESSION_ID');

    return this.unAuthorized(response, 'Não autorizado');
  }
}
