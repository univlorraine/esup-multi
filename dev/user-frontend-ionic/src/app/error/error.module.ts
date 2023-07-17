import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { AuthInterceptor } from '@ul/shared';
import { AppErrorHandler } from './app.error-handler';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {
      provide: AuthInterceptor
    },
  ]
})
export class ErrorModule { }
