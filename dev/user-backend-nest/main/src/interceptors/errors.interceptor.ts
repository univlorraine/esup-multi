import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // propagate standard http exception from microservices
        if (err.status && Number.isInteger(err.status) && err.message) {
          return throwError(() => new HttpException(err.message, err.status));
        }

        // specific exception when microservice is down
        if (err.code === 'ECONNREFUSED') {
          return throwError(() => new BadGatewayException(err.message));
        }

        // generic exceptions
        return throwError(() => new InternalServerErrorException(err.message));
      }),
    );
  }
}
