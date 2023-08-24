import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DirectusStaticPageResultDto } from './static-pages.dto';
import { StaticPagesService } from './static-pages.service';

@Controller()
export class StaticPagesController {
  constructor(private readonly staticPagesService: StaticPagesService) {}

  @MessagePattern({ cmd: 'staticPages' })
  @CacheKey('staticPages')
  @UseInterceptors(CacheInterceptor)
  getStaticPages(): Observable<DirectusStaticPageResultDto[]> {
    return this.staticPagesService.getStaticPages();
  }
}
