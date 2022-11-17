import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
  constructor(
    @Inject('INFO_SERVICE') private infoClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('MAP_SERVICE') private mapClient: ClientProxy,
    @Inject('RSS_SERVICE') private rssClient: ClientProxy,
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

  @Post('/sso-service-token')
  requestSsoServiceToken(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'requestSsoServiceToken',
      },
      body,
    );
  }

  @Get('/map')
  map() {
    return this.mapClient.send(
      {
        cmd: 'map',
      },
      {},
    );
  }

  @Get('/rss')
  rss() {
    return this.rssClient.send(
      {
        cmd: 'rss',
      },
      {},
    );
  }
}
