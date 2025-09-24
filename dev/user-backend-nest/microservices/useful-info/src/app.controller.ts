import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'usefulInformation' })
  getUsefulInformation(): Observable<any[]> {
    return this.appService.getUsefulInformation();
  }
}
