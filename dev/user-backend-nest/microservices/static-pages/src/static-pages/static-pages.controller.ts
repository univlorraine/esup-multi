import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DirectusStaticPageResultDto } from './static-pages.dto';
import { StaticPagesService } from './static-pages.service';

@Controller()
export class StaticPagesController {
  constructor(private readonly staticPagesService: StaticPagesService) {}

  @MessagePattern({ cmd: 'staticPages' })
  getStaticPages(): Observable<DirectusStaticPageResultDto[]> {
    return this.staticPagesService.getStaticPages();
  }
}
