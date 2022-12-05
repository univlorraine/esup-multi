import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Info } from './info.dto';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @MessagePattern({ cmd: 'info' })
  getInfo(language: string): Observable<Info[]> {
    return this.infoService.getInfo(language);
  }
}
