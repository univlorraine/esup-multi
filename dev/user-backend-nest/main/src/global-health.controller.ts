import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health-all')
export class GlobalHealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth() {
    return this.healthCheckService.check([
      () =>
        this.microservice.pingCheck('features', {
          transport: Transport.TCP,
          options: {
            host: process.env.FEATURES_SERVICE_HOST,
            port: process.env.FEATURES_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('auth', {
          transport: Transport.TCP,
          options: {
            host: process.env.AUTH_SERVICE_HOST,
            port: process.env.AUTH_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('map', {
          transport: Transport.TCP,
          options: {
            host: process.env.MAP_SERVICE_HOST,
            port: process.env.MAP_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('rss', {
          transport: Transport.TCP,
          options: {
            host: process.env.RSS_SERVICE_HOST,
            port: process.env.RSS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('cards', {
          transport: Transport.TCP,
          options: {
            host: process.env.CARDS_SERVICE_HOST,
            port: process.env.CARDS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('schedule', {
          transport: Transport.TCP,
          options: {
            host: process.env.SCHEDULE_SERVICE_HOST,
            port: process.env.SCHEDULE_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('contacts', {
          transport: Transport.TCP,
          options: {
            host: process.env.CONTACTS_SERVICE_HOST,
            port: process.env.CONTACTS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('notifications', {
          transport: Transport.TCP,
          options: {
            host: process.env.NOTIFICATIONS_SERVICE_HOST,
            port: process.env.NOTIFICATIONS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('important-news', {
          transport: Transport.TCP,
          options: {
            host: process.env.IMPORTANT_NEWS_SERVICE_HOST,
            port: process.env.IMPORTANT_NEWS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('clocking', {
          transport: Transport.TCP,
          options: {
            host: process.env.CLOCKING_SERVICE_HOST,
            port: process.env.CLOCKING_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('social-network', {
          transport: Transport.TCP,
          options: {
            host: process.env.SOCIAL_NETWORK_SERVICE_HOST,
            port: process.env.SOCIAL_NETWORK_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('chatbot', {
          transport: Transport.TCP,
          options: {
            host: process.env.CHATBOT_SERVICE_HOST,
            port: process.env.CHATBOT_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('static-pages', {
          transport: Transport.TCP,
          options: {
            host: process.env.STATIC_PAGES_SERVICE_HOST,
            port: process.env.STATIC_PAGES_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('contact-us', {
          transport: Transport.TCP,
          options: {
            host: process.env.CONTACT_US_SERVICE_HOST,
            port: process.env.CONTACT_US_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('restaurants', {
          transport: Transport.TCP,
          options: {
            host: process.env.RESTAURANTS_SERVICE_HOST,
            port: process.env.RESTAURANTS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('statistics', {
          transport: Transport.TCP,
          options: {
            host: process.env.STATISTICS_SERVICE_HOST,
            port: process.env.STATISTICS_SERVICE_PORT,
          },
        }),
      () =>
        this.microservice.pingCheck('mail-calendar', {
          transport: Transport.TCP,
          options: {
            host: process.env.MAIL_CALENDAR_SERVICE_HOST,
            port: process.env.MAIL_CALENDAR_SERVICE_PORT,
          },
        }),
    ]);
  }
}
