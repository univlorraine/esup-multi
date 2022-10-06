import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @MessagePattern({ cmd: 'hello' })
  hello(name: string): string {
    return this.helloService.hello(name);
  }
}
