import { Controller, Get } from '@nestjs/common';

@Controller()
export class MonitoringController {
  @Get('/health')
  getHealthStatus() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
