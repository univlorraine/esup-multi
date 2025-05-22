import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CmsService {
  constructor(private readonly configService: ConfigService) {}

  getCurrentCmsConfig() {
    return this.configService.get('cms');
  }
}
