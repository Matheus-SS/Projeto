/* eslint-disable prefer-rest-params */
import { LogRepository } from '@infra/repository/log/logRepository';
import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { LOG_REPOSITORY_PROVIDER } from '@src/constants';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DatabaseLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOG_REPOSITORY_PROVIDER) private logRepository: LogRepository,
  ) {}
  use(request: Request, response: Response, next: NextFunction) {
    const url = request.originalUrl;
    const method = request.method;
    const body = request.body;

    const oldWrite = response.write;
    const oldEnd = response.end;
    const chunks = [];
    response.write = function (chunk: any) {
      chunks.push(chunk);
      return oldWrite.apply(response, arguments);
    };
    response.end = function (chunk: any) {
      if (chunk) {
        chunks.push(chunk);
      }
      return oldEnd.apply(response, arguments);
    };
    response.on('finish', async () => {
      const responseBody = Buffer.concat(chunks).toString('utf8');
      const l = {
        request: body,
        path: url,
        method: method,
        response_time: Date.now() - request.timestamp,
        status_code: response.statusCode,
        response: responseBody,
        created_at: new Date(),
      };

      await this.logRepository.create(l);
    });

    next();
  }
}
