import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { concatMap, map } from 'rxjs';
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
  authenticate(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'authenticate',
      },
      body,
    );
  }

  @Delete('/auth')
  logout(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'logout',
      },
      body,
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
  requestSsoServiceToken(@Body() body) {
    return this.authClient.send(
      {
        cmd: 'requestSsoServiceToken',
      },
      body,
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

  @Get('/map')
  map() {
    return this.mapClient.send(
      {
        cmd: 'map',
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
              startDate: body.startDate,
              endDate: body.endDate,
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
              userId: user.username,
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
              token: body.token,
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
                ...(({ authToken, ...rest }) => rest)(body.userData),
              }
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
}
