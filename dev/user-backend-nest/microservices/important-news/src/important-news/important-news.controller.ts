import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DirectusImportantNews } from './important-news.dto';
import { ImportantNewsService } from './important-news.service';

@Controller()
export class ImportantNewsController {
  constructor(private readonly importantNewsService: ImportantNewsService) {}

  @MessagePattern({ cmd: 'important-news' })
  getImportantNews(): Observable<DirectusImportantNews[]> {
    return this.importantNewsService.getImportantNews();
  }
}
