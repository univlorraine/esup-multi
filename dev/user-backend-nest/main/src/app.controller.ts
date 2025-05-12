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

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { concatMap, map } from 'rxjs';
import * as infosJsonData from './infos.json';
import * as clientInfosJson from './client-infos.json';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { AuthorizationHelper } from './security/authorization.helper';

@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
  constructor(
    @Inject('FEATURES_SERVICE') private featuresClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('MAP_SERVICE') private mapClient: ClientProxy,
    @Inject('RSS_SERVICE') private rssClient: ClientProxy,
    @Inject('CARDS_SERVICE') private cardsClient: ClientProxy,
    @Inject('SCHEDULE_SERVICE') private scheduleClient: ClientProxy,
    @Inject('CONTACTS_SERVICE') private contactsClient: ClientProxy,
    @Inject('IMPORTANT_NEWS_SERVICE') private importantNewsClient: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE') private notificationsClient: ClientProxy,
    @Inject('CLOCKING_SERVICE') private clockingClient: ClientProxy,
    @Inject('CHATBOT_SERVICE') private chatbotClient: ClientProxy,
    @Inject('SOCIAL_NETWORK_SERVICE') private socialNetworkClient: ClientProxy,
    @Inject('STATIC_PAGES_SERVICE') private staticPagesClient: ClientProxy,
    @Inject('CONTACT_US_SERVICE') private contactUsClient: ClientProxy,
    @Inject('RESTAURANTS_SERVICE') private restaurantsClient: ClientProxy,
    @Inject('STATISTICS_SERVICE') private statisticsClient: ClientProxy,
    @Inject('MAIL_CALENDAR_SERVICE') private mailCalendarClient: ClientProxy,
  ) {}

  @Post('/features')
  info(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUser',
        },
        body,
      )
      .pipe(
        concatMap((user) => {
          if (body.authToken && user === null) {
            throw new UnauthorizedException('User not found');
          }

          const roles = user ? user.roles : ['anonymous'];

          return this.featuresClient
            .send(
              {
                cmd: 'features',
              },
              roles,
            )
            .pipe(
              map((features) => {
                return new AuthorizationHelper(roles).filter(features);
              }),
            );
        }),
      );
  }

  @Post('/auth')
  authenticate(@Body() body, @Request() request) {
    return this.authClient.send(
      {
        cmd: 'authenticate',
      },
      {
        ...body,
        ip: request.ip,
      },
    );
  }

  @Delete('/auth')
  logout(@Body() body, @Request() request) {
    return this.authClient.send(
      {
        cmd: 'logout',
      },
      {
        body,
        ip: request.ip,
      },
    );
  }

  @Post('/keep-auth/reauth')
  @UseGuards(AuthGuard('auth-jwt'))
  reauthenticateUsingSavedCredentials(@Request() request) {
    const jwtPayload = request.user;
    return this.authClient.send(
      {
        cmd: 'reauthenticateUsingSavedCredentials',
      },
      jwtPayload,
    );
  }

  @Post('/keep-auth/auth')
  authenticateAndSaveCredentials(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'authenticateAndSaveCredentials',
      },
      body,
    );
  }

  @Delete('/keep-auth/auth')
  @UseGuards(AuthGuard('auth-jwt'))
  logoutAndDeleteCredentials(@Body() body, @Request() request) {
    const jwtPayload = request.user;
    return this.authClient.send(
      {
        cmd: 'logoutAndDeleteCredentials',
      },
      {
        ...body,
        ...jwtPayload,
      },
    );
  }

  @Delete('/keep-auth/reauth')
  @UseGuards(AuthGuard('auth-jwt'))
  deleteCredentials(@Request() request) {
    const jwtPayload = request.user;
    return this.authClient.send(
      {
        cmd: 'deleteCredentials',
      },
      {
        ...jwtPayload,
      },
    );
  }

  @Post('/sso-service-token')
  requestSsoServiceToken(@Body() body, @Request() request) {
    return this.authClient.send(
      {
        cmd: 'requestSsoServiceToken',
      },
      {
        ...body,
        ip: request.ip,
      },
    );
  }

  @Post('/keep-auth/reauth-if-needed')
  @UseGuards(AuthGuard('auth-jwt'))
  reauthenticateIfNeeded(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'reauthenticateIfNeeded',
      },
      body,
    );
  }

  @Get('/auth/login-page-content')
  loginPageContent() {
    return this.authClient.send(
      {
        cmd: 'loginPageContent',
      },
      {},
    );
  }

  @Get('/map')
  map() {
    return this.mapClient.send(
      {
        cmd: 'map',
      },
      {},
    );
  }

  @Get('/map/categories')
  mapCategories() {
    return this.mapClient.send(
      {
        cmd: 'mapCategories'
      },
      {},
    );
  }

  @Get('/map/campuses')
  mapCampus() {
    return this.mapClient.send(
      {
        cmd: 'mapCampuses'
      },
      {},
    );
  }

  @Get('/rss')
  rss() {
    return this.rssClient.send(
      {
        cmd: 'rss',
      },
      {},
    );
  }

  @Post('/cards')
  cards(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.cardsClient.send(
            {
              cmd: 'cards',
            },
            user.username,
          ),
        ),
      );
  }

  @Post('/schedule')
  schedule(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.scheduleClient.send(
            {
              cmd: 'schedule',
            },
            {
              username: user.username,
              roles: user.roles,
              startDate: body.startDate,
              endDate: body.endDate,
              asUser: body.asUser,
            },
          ),
        ),
      );
  }

  @Post('/important-news')
  importantNews(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUser',
        },
        body,
      )
      .pipe(
        concatMap((user) => {
          const roles = user ? user.roles : ['anonymous'];
          return this.importantNewsClient
            .send(
              {
                cmd: 'important-news',
              },
              roles,
            )
            .pipe(
              map((importantNews) => {
                return new AuthorizationHelper(roles).filter(importantNews);
              }),
            );
        }),
      );
  }

  @Post('/contacts')
  contacts(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUser',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.contactsClient.send(
            {
              cmd: 'contacts',
            },
            {
              type: body.type,
              value: body.value,
              userId: user?.username || null,
            },
          ),
        ),
      );
  }

  @Post('/notifications')
  notifications(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'notifications',
            },
            {
              username: user.username,
              offset: body.offset,
              length: body.length,
            },
          ),
        ),
      );
  }

  @Post('/notifications/read')
  notificationsRead(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'notificationsRead',
            },
            {
              username: user.username,
              notificationIds: body.notificationIds,
            },
          ),
        ),
      );
  }

  @Delete('/notifications/delete')
  deteleNotifications(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'notificationsDelete',
            },
            {
              notificationId: body.notificationId,
              username: user.username,
            },
          ),
        ),
      );
  }

  @Get('/notifications/channels')
  notificationsChannels() {
    return this.notificationsClient.send(
      {
        cmd: 'channels',
      },
      {},
    );
  }

  @Patch('/notifications/channels')
  notificationsSubscribeUserToChannel(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'channelsAllowOrDisallow',
            },
            {
              username: user.username,
              channels: body.channelCodes,
            },
          ),
        ),
      );
  }

  @Post('/notifications/unsubscribed-channels')
  notificationsUnsubscribedChannels(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'unsubscribedChannels',
            },
            {
              username: user.username,
            },
          ),
        ),
      );
  }
  @Post('/notifications/register')
  registerFCMToken(@Request() request, @Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'registerFCMToken',
            },
            {
              username: user.username,
              token: body.token,
              platform: body.platform,
              ip: request.ip,
            },
          ),
        ),
      );
  }

  @Post('/notifications/unregister')
  unregisterFCMToken(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.notificationsClient.send(
            {
              cmd: 'unregisterFCMToken',
            },
            {
              username: user.username,
              token: body.fcmToken,
            },
          ),
        ),
      );
  }

  @Post('/clocking')
  getClocking(@Request() request) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        request.body,
      )
      .pipe(
        concatMap((user) =>
          this.clockingClient.send(
            {
              cmd: 'clocking',
            },
            {
              username: user.username,
              ip: request.ip,
            },
          ),
        ),
      );
  }

  @Post('/clock-in')
  clockIn(@Request() request) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        request.body,
      )
      .pipe(
        concatMap((user) =>
          this.clockingClient.send(
            {
              cmd: 'clockIn',
            },
            {
              username: user.username,
              ip: request.ip,
            },
          ),
        ),
      );
  }

  @Get('/social-network')
  socialnetwork() {
    return this.socialNetworkClient.send(
      {
        cmd: 'socialNetwork',
      },
      {},
    );
  }

  @Post('/chatbot/text-request')
  chatbotTextRequest(@Body() body) {
    return this.chatbotClient.send(
      {
        cmd: 'textRequest',
      },
      body,
    );
  }

  @Post('/chatbot/button-payload-request')
  chatbotButtonPayloadRequest(@Body() body) {
    return this.chatbotClient.send(
      {
        cmd: 'buttonRequest',
      },
      body,
    );
  }

  @Get('/static-pages')
  staticPages() {
    return this.staticPagesClient.send(
      {
        cmd: 'staticPages',
      },
      {},
    );
  }

  @Post('/contact-us')
  contactUs(@Body() body, @Request() request) {
    return this.authClient
      .send(
        {
          cmd: 'getUser',
        },
        body.userData,
      )
      .pipe(
        concatMap((user) => {
          return this.contactUsClient.send(
            {
              cmd: 'contactUs',
            },
            {
              from: body.from,
              subject: body.subject,
              text: body.text,
              userData: {
                username: user ? user.username : 'anonymous',
                userAgent: request.headers['user-agent'],
                ...(({ authToken, ...rest }) => rest)(body.userData), //eslint-disable-line @typescript-eslint/no-unused-vars
              },
            },
          );
        }),
      );
  }

  @Get('/contact-us')
  contactUsPageContent() {
    return this.contactUsClient.send(
      {
        cmd: 'contactUsPageContent',
      },
      {},
    );
  }

  @Get('/restaurants')
  restaurants() {
    return this.restaurantsClient.send(
      {
        cmd: 'restaurants',
      },
      {},
    );
  }

  @Get('/restaurant/menus')
  getRestaurantMenus(@Query() queryParams) {
    return this.restaurantsClient.send(
      {
        cmd: 'restaurant/menus',
      },
      queryParams,
    );
  }

  @Post('/statistics/user-action')
  statisticsUserAction(@Body() body, @Request() request) {
    return this.authClient
      .send(
        {
          cmd: 'getUser',
        },
        body,
      )
      .pipe(
        concatMap((user) => {
          return this.statisticsClient.send(
            {
              cmd: 'postUserActionStatistic',
            },
            {
              uid: user ? user.username : 'anonymous',
              userAgent: request.headers['user-agent'],
              xForwardedFor:
                request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress,
              ...(({ authToken, ...rest }) => rest)(body.data), //eslint-disable-line @typescript-eslint/no-unused-vars
            },
          );
        }),
      );
  }

  @Post('/mail-calendar')
  mailCalendar(@Body() body) {
    return this.authClient
      .send(
        {
          cmd: 'getUserOrThrowError',
        },
        body,
      )
      .pipe(
        concatMap((user) =>
          this.mailCalendarClient.send(
            {
              cmd: 'mailCalendar',
            },
            {
              login: user.username,
            },
          ),
        ),
      );
  }

  @Get('/version')
  mainVersion() {
    return {
      version: infosJsonData.version,
    };
  }
  @Get('/app-update-infos')
  appUpdateInfos() {
    return clientInfosJson;
  }

  @Get('/health')
  mainCheckHealth() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  private getClientProxy(serviceName: string) {
    const name = serviceName && this.convertToCamelCase(serviceName);
    if (this[`${name}Client`]) {
      return this[`${name}Client`];
    } else {
      throw new NotFoundException(`Service '${serviceName}' not found.`);
    }
  }

  private convertToCamelCase(str: string): string {
    if (!str) {
      return;
    }
    return str.replace(/-([a-zA-Z])/g, (_, letter) => letter.toUpperCase());
  }
}
