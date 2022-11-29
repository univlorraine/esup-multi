import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { defaultIfEmpty } from 'rxjs/operators';

/**
 * Convert Observable<void> responses to a empty body in controllers
 */
@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(defaultIfEmpty(''));
  }
}
