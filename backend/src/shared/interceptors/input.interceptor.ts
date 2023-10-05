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
      request.body[value] = this.escapeHtml(inputValue);
    });

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
