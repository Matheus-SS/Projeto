import { Controller, Inject, Res, Get, Req } from '@nestjs/common';

import { Request, Response } from 'express';
import { BaseController } from '@shared/baseController';
import { FIND_SESSION_QUERY_PROVIDER, SESSION_ROUTE } from '@src/constants';
import { InterfaceQuery } from '@shared/query.interface';
import { IFindSession } from './query/dto/findSessionDTO';

@Controller(SESSION_ROUTE)
export class SessionController extends BaseController {
  constructor(
    @Inject(FIND_SESSION_QUERY_PROVIDER)
    private findSession: InterfaceQuery<string, Promise<IFindSession>>,
  ) {
    super();
  }

  @Get('/')
  public async executeImpl(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    if (request.userId) {
      return response.status(200).json(true);
    } else {
      return response.status(200).json(false);
    }
  }
}
