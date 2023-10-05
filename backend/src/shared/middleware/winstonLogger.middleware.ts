/* eslint-disable prefer-rest-params */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    request.timestamp = Date.now();
    const url = request.originalUrl;
    const method = request.method;
    const body = request.body;
    const userAgent = request.get('user-agent') || '';
    const ip = request.headers['x-forwarded-for'] || request.ip;
    const logger = winston.createLogger({
      level: 'info',
      defaultMeta: { service: 'backend-service' },
      transports: [
        new winston.transports.File({ filename: 'logs.log', level: 'info' }),
      ],
    });

    const loggerError = winston.createLogger({
      level: 'info',
      defaultMeta: { service: 'backend-service' },
      transports: [
        new winston.transports.File({ filename: 'logs.log', level: 'error' }),
      ],
    });
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

    response.on('finish', () => {
      const responseBody = Buffer.concat(chunks).toString('utf8');
      const l = {
        request: body,
        user_id: request?.userId || null,
        path: url,
        method: method,
        response_time: Date.now() - request.timestamp,
        status_code: response.statusCode,
        response: responseBody,
        created_at: new Date(),
        user_agent: userAgent,
        ip: ip,
      };
      if (response.statusCode >= 400) {
        loggerError.log('error', l);
      } else {
        logger.log('info', l);
      }
    });
    next();
  }
}
