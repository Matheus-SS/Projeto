import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../baseController';

@Injectable()
export class AuthMiddleware extends BaseController implements NestMiddleware {
  constructor() {
    super();
  }
  async use(request: Request, response: Response, next: NextFunction) {}
}
