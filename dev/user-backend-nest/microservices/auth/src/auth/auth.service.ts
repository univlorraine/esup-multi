import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { from, Observable } from 'rxjs';
import { concatWith, delayWhen, map, tap, toArray } from 'rxjs/operators';
import { DirectusApi } from '../config/configuration.interface';
import { LoginPageContentResultDto } from '../page-content/login-page-content/login-page-content.dto';
import { LoginPageContentService } from '../page-content/login-page-content/login-page-content.service';
import {
  AuthenticatedDto,
  AuthenticateQueryDto,
  GetUserQueryDto,
  GetUserResultDto,
  IsAuthenticationValidQueryDto,
  LogoutQueryDto,
  SsoServiceTokenQueryDto,
  UserProfileDto
} from './auth.dto';
import { AuthenticatedUserRepository } from './authenticated-user/authenticated-user.repository';
import { CasService } from './cas.service';
import { UserService } from './user.service';

dotenv.config(); // used to get process.env access prior to AppModule instanciation (typically in @Cron decorators)

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private usernamesCleanupNotUsedSinceInDays: number;
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly casService: CasService,
    private readonly userService: UserService,
    private readonly loginPageContentService: LoginPageContentService,
    private readonly usernameRepository: AuthenticatedUserRepository,
    private readonly config: ConfigService,
  ) {
    this.usernamesCleanupNotUsedSinceInDays = this.config.get<number>(
      'usernamesCleanup.notUsedSinceInDays',
    );
  }

  public authenticate(
    query: AuthenticateQueryDto,
  ): Observable<AuthenticatedDto> {
    return this.casService.requestTgt(query).pipe(
      concatWith(this.userService.getUserProfile(query.username)),
      toArray(),
      map((res) => {
        const authToken = res[0] as string;
        const userProfile = res[1] as UserProfileDto;

        return {
          authToken,
          ...userProfile,
        };
      }),
      delayWhen((authenticated) =>
        from(
          this.usernameRepository.saveAuthenticatedUser({
            authToken: authenticated.authToken,
            username: query.username,
            roles: authenticated.roles,
          }),
        ),
      ),
    );
  }

  public logout(query: LogoutQueryDto): Observable<boolean> {
    return this.casService
      .logout(query.authToken)
      .pipe(
        delayWhen(() =>
          from(
            this.usernameRepository.removeAuthenticatedUser(query.authToken),
          ),
        ),
      );
  }

  public requestSsoServiceToken(
    query: SsoServiceTokenQueryDto,
  ): Observable<string> {
    return this.casService.requestSt(query);
  }

  public isAuthenticationValid(
    query: IsAuthenticationValidQueryDto,
  ): Observable<boolean> {
    return this.casService.isTgtValid(query.authToken);
  }

  public getUser(query: GetUserQueryDto): Observable<GetUserResultDto | null> {
    return from(
      this.usernameRepository.getAuthenticatedUser(query.authToken),
    ).pipe(
      map((usernameDocument) => {
        if (!usernameDocument) {
          this.logger.debug(
            `Unable to get user associated to authentication token ${query.authToken}`,
          );
          return null;
        }

        this.logger.debug(
          `Got user ${usernameDocument} from authToken ${query.authToken}`,
        );
        return {
          username: usernameDocument.username,
          roles: usernameDocument.roles,
        };
      }),
    );
  }

  public getUserOrThrowError(
    query: GetUserQueryDto,
  ): Observable<GetUserResultDto> {
    return this.getUser(query).pipe(
      tap((user) => {
        if (!user) {
          throw new RpcException(
            new UnauthorizedException(
              `Unable to get user associated to authentication token ${query.authToken}`,
            ),
          );
        }
      }),
    );
  }

  @Cron(process.env.AUTH_SERVICE_USERNAMES_CLEANUP_SCHEDULE)
  async cleanupUsernames() {
    const limitDate = new Date();
    limitDate.setDate(
      limitDate.getDate() - this.usernamesCleanupNotUsedSinceInDays,
    );
    this.logger.log(
      `Removing usernames not used for ${this.usernamesCleanupNotUsedSinceInDays} days (since ${limitDate})`,
    );
    await this.usernameRepository.removeAuthenticatedUserLastUsedBefore(
      limitDate,
    );
  }

  public getPageContent(): Observable<LoginPageContentResultDto> {
    return from(this.loginPageContentService.getLoginPageContent());
  }
}
