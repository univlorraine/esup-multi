import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
  constructor(
    @Inject('INFO_SERVICE') private infoClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  @Get('/info')
  info() {
    return this.infoClient.send(
      {
        cmd: 'info',
      },
      {},
    );
  }

  @Post('/auth')
  authenticate(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'authenticate',
      },
      body,
    );
  }

  @Delete('/auth')
  logout(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'logout',
      },
      body,
    );
  }
}
