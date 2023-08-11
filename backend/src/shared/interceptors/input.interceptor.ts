import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InputInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    Object.keys(request.body).forEach((value) => {
      const inputValue = request.body[value];
      // const condition =
      //   inputValue !== undefined ||
      //   inputValue !== null ||
      //   inputValue !== '' ||
      //   (typeof inputValue === 'string' && !inputValue);

      // console.log('INPUT...', condition);
      // console.log('INPUT...', typeof inputValue === 'string' && !inputValue);

      request.body[value] = this.escapeHtml(inputValue);
    });
    // this.escapeHtml(request.params);
    // this.escapeHtml(request.query);

    return next
      .handle()
      .pipe(tap(() => console.log(`After INPUT INTERCEPTOR... `)));
  }
  private escapeHtml(unsafe: any) {
    if (typeof unsafe === 'string') {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
    } else {
      return unsafe;
    }
  }
}
