import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DirectusStaticPageResultDto } from './static-pages.dto';
import { StaticPagesService } from './static-pages.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class StaticPagesController {
  constructor(private readonly staticPagesService: StaticPagesService) {}

  @MessagePattern({ cmd: 'staticPages' })
  getStaticPages(): Observable<DirectusStaticPageResultDto[]> {
    return this.staticPagesService.getStaticPages();
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  @MessagePattern({ cmd: 'version' })
  getVersion() {
    return {
      version: infosJsonData.version,
    };
  }
}
