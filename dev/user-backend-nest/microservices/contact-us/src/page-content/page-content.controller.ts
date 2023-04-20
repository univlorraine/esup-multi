import { Controller } from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { MessagePattern } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { PageContentResultDto } from './page-content.dto';

@Controller()
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @MessagePattern({ cmd: 'contactUsPageContent' })
  getContactUsPageContent(): Observable<PageContentResultDto> {
    return from(this.pageContentService.getPageContent());
  }
}
