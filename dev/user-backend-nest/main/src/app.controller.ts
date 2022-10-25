import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE') private helloClient: ClientProxy,
    @Inject('MATH_SERVICE') private mathClient: ClientProxy,
    @Inject('INFO_SERVICE') private infoClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  @Get('/hello')
  hello(@Query('name') name: string): Observable<string> {
    return this.helloClient.send(
      {
        cmd: 'hello',
      },
      name,
    );
  }

  @Get('/math/sum')
  mathSum(@Query('values') values: string[]): Observable<number> {
    const numbers: number[] = values.map((value) => parseFloat(value));
    return this.mathClient.send(
      {
        cmd: 'sum',
      },
      numbers,
    );
  }

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
