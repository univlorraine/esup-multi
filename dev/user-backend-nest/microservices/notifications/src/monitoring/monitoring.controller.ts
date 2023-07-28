import { Controller, Get } from '@nestjs/common';
import * as infosJsonData from '../infos.json';

@Controller()
export class MonitoringController {
  @Get('/health')
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  @Get('/version')
  getVersion() {
    return {
      version: infosJsonData.version,
    };
  }
}
