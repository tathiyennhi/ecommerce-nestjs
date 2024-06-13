import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(data => ({
          status: 'success',
          data: data,
        })),
        catchError(err => {
          // Để nguyên lỗi, không chuẩn hóa lỗi trong Interceptor này
          return throwError(() => err);
        }),
      );
    }
  }
  