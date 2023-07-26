import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { PageContentResultDto } from './page-content.dto';
import { PageContentService } from './page-content.service';

@Controller()
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @MessagePattern({ cmd: 'contactUsPageContent' })
  getContactUsPageContent(): Observable<PageContentResultDto> {
    return from(this.pageContentService.getPageContent());
  }
}
