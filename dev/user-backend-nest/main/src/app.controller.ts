import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { concatMap, map, zip } from 'rxjs';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { AuthorizationHelper } from './security/authorization.helper';

@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
  constructor(
    @Inject('TILES_SERVICE') private infoClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('MAP_SERVICE') private mapClient: ClientProxy,
    @Inject('RSS_SERVICE') private rssClient: ClientProxy,
    @Inject('CARDS_SERVICE') private cardsClient: ClientProxy,
    @Inject('SCHEDULE_SERVICE') private scheduleClient: ClientProxy,
  ) {}

  @Post('/tiles/:language')
  info(@Body() body, @Param('language') language) {
    const user$ = this.authClient.send(
      {
        cmd: 'getUser',
      },
      body,
    );
    const info$ = this.infoClient.send(
      {
        cmd: 'tiles',
      },
      language,
    );

    return zip(user$, info$).pipe(
      map(([user, info]) => {
        const roles = user ? user.roles : ['anonymous'];
        return new AuthorizationHelper(roles).filter(info);
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
}
