import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE') private helloClient: ClientProxy,
    @Inject('MATH_SERVICE') private mathClient: ClientProxy,
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
}
