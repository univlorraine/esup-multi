/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import microserviceAuthConfig from './config/microservice-auth.config';
import microserviceCardsConfig from './config/microservice-cards.config';
import microserviceChatbotConfig from './config/microservice-chatbot.config';
import microserviceClockingConfig from './config/microservice-clocking.config';
import microserviceContactsConfig from './config/microservice-contacts.config';
import microserviceImportantNewsConfig from './config/microservice-important-news.config';
import microserviceMapConfig from './config/microservice-map.config';
import microserviceNotificationsConfig from './config/microservice-notifications.config';
import microserviceRssConfig from './config/microservice-rss.config';
import microserviceScheduleConfig from './config/microservice-schedule.config';
import microserviceSocialNetworkConfig from './config/microservice-social-network';
import microserviceStaticPagesConfig from './config/microservice-static-pages.config';
import microserviceFeaturesConfig from './config/microservice-features.config';
import microserviceContactUsConfig from './config/microservice-contact-us.config';
import microserviceRestaurantsConfig from './config/microservice-restaurants.config';
import microserviceStatisticsConfig from './config/microservice-statistics.config';
import microserviceMailCalendarConfig from './config/microservice-mail-calendar.config';
import { AuthJwtStrategy } from './security/auth-jwt.strategy';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import * as process from 'process';
import { LogsMiddleware } from './logs.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ClientsModule.registerAsync([
      {
        name: 'FEATURES_SERVICE',
        imports: [ConfigModule.forFeature(microserviceFeaturesConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-features'),
        inject: [ConfigService],
      },
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule.forFeature(microserviceAuthConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-auth'),
        inject: [ConfigService],
      },
      {
        name: 'MAP_SERVICE',
        imports: [ConfigModule.forFeature(microserviceMapConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-map'),
        inject: [ConfigService],
      },
      {
        name: 'RSS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceRssConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-rss'),
        inject: [ConfigService],
      },
      {
        name: 'CARDS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceCardsConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-cards'),
        inject: [ConfigService],
      },
      {
        name: 'SCHEDULE_SERVICE',
        imports: [ConfigModule.forFeature(microserviceScheduleConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-schedule'),
        inject: [ConfigService],
      },
      {
        name: 'CONTACTS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceContactsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-contacts'),
        inject: [ConfigService],
      },
      {
        name: 'IMPORTANT_NEWS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceImportantNewsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-important-news'),
        inject: [ConfigService],
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceNotificationsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-notifications'),
        inject: [ConfigService],
      },
      {
        name: 'CLOCKING_SERVICE',
        imports: [ConfigModule.forFeature(microserviceClockingConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-clocking'),
        inject: [ConfigService],
      },
      {
        name: 'SOCIAL_NETWORK_SERVICE',
        imports: [ConfigModule.forFeature(microserviceSocialNetworkConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-social-network'),
        inject: [ConfigService],
      },
      {
        name: 'CHATBOT_SERVICE',
        imports: [ConfigModule.forFeature(microserviceChatbotConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-chatbot'),
        inject: [ConfigService],
      },
      {
        name: 'STATIC_PAGES_SERVICE',
        imports: [ConfigModule.forFeature(microserviceStaticPagesConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-static-pages'),
        inject: [ConfigService],
      },
      {
        name: 'CONTACT_US_SERVICE',
        imports: [ConfigModule.forFeature(microserviceContactUsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-contact-us'),
        inject: [ConfigService],
      },
      {
        name: 'RESTAURANTS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceRestaurantsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-restaurants'),
        inject: [ConfigService],
      },
      {
        name: 'STATISTICS_SERVICE',
        imports: [ConfigModule.forFeature(microserviceStatisticsConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-statistics'),
        inject: [ConfigService],
      },
      {
        name: 'MAIL_CALENDAR_SERVICE',
        imports: [ConfigModule.forFeature(microserviceMailCalendarConfig)],
        useFactory: (config: ConfigService) =>
          config.get('microservice-mail-calendar'),
        inject: [ConfigService],
      },
    ]),
    PassportModule,
    TerminusModule,
    ...(process.env.EXTENDED_LOGS === 'true'
      ? [
          LoggerModule.forRoot({
            pinoHttp: {
              transport: {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  levelFirst: true,
                },
              },
            },
          }),
        ]
      : []),
  ],
  controllers: [AppController],
  providers: [AuthJwtStrategy],
})
export class AppModule {
  // Track HTTP requests with short log
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
