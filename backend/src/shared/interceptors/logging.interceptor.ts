import { LogRepository } from '@infra/repository/log/logRepository';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { LOG_REPOSITORY_PROVIDER } from '@src/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function logResponseBody(res, callback) {
  const send = res.send;
  res.send = function (body) {
    callback(body);
    send.call(this, body);
  };
}
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOG_REPOSITORY_PROVIDER) private logRepository: LogRepository,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const url = request.url;
    const method = request.method;
    const body = request.body;

    let responseBody;
    logResponseBody(response, function (response) {
      responseBody = response;
    });

    return next.handle().pipe(
      map(async (data) => {
        const l = {
          request: body,
          path: url,
          method: method,
          response_time: Date.now() - now,
          status_code: response.statusCode,
          response: responseBody,
          created_at: new Date(),
        };

        await this.logRepository.create(l);

        return data;
      }),
    );
  }
}
