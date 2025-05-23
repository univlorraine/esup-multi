import { Controller, Get } from '@nestjs/common';
import { Public } from '@common/decorators/public.decorator';

@Controller()
export class MonitoringController {
  @Public()
  @Get('/health')
  getHealthStatus() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
