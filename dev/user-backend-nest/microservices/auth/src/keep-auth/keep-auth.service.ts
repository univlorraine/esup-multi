import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {
  ReauthenticateQueryDto,
  KeepAuthenticatedDto,
  KeepAuthenticatedLogoutQueryDto,
  ReauthenticateIfNeededResultDto,
  ReauthenticateIfNeededQueryDto,
  RemoveSavedCredentialsQueryDto,
} from './keep-auth.dto';
import { AuthService } from '../auth/auth.service';
import { AuthenticatedDto, AuthenticateQueryDto } from '../auth/auth.dto';
import { concatMap, from, map, Observable, of, tap } from 'rxjs';
import { AesEncryptionService } from './encryption/aes-encryption.service';
import { UserCredentialsRepository } from './user-credentials/user-credentials.repository';
import { JwtService } from '@nestjs/jwt';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { RpcException } from '@nestjs/microservices';

dotenv.config(); // used to get process.env access prior to AppModule instanciation (typically in @Cron decorators)
@Injectable()
export class KeepAuthService {
  private readonly logger = new Logger(KeepAuthService.name);

  private credentialsCleanupNotUsedSinceInDays: number;

  constructor(
    private readonly authService: AuthService,
    private readonly encryptionService: AesEncryptionService,
    private readonly userCredentialsRepository: UserCredentialsRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.credentialsCleanupNotUsedSinceInDays = this.config.get<number>(
      'credentialsCleanup.notUsedSinceInDays',
    );
  }

  public authenticateAndSaveCredentials(
    query: AuthenticateQueryDto,
  ): Observable<KeepAuthenticatedDto> {
    return this.authService.authenticate(query).pipe(
      concatMap((authenticatedDto) => {
        const encryptionParameters =
          this.encryptionService.generateRandomEncryptionParameters();

        const encryptedUsername = this.encryptionService.encrypt(
          encryptionParameters,
          query.username,
        );
        const encryptedPassword = this.encryptionService.encrypt(
          encryptionParameters,
          query.password,
        );

        return from(
          this.userCredentialsRepository
            .saveCredentials({
              encryptedUsername,
              encryptedPassword,
            })
            .then((userCredentials) => {
              const jwtPayload: ReauthenticateQueryDto = {
                uuid: userCredentials._id.toString(),
                iv: encryptionParameters.iv,
                key: encryptionParameters.key,
              };
              const refreshAuthToken = this.jwtService.sign(jwtPayload);

              return {
                ...authenticatedDto,
                refreshAuthToken,
              };
            }),
        );
      }),
    );
  }

  public reauthenticate(
    query: ReauthenticateQueryDto,
  ): Observable<AuthenticatedDto> {
    this.logger.debug(`Re-authentication for uuid : ${query.uuid}`);
    return from(this.userCredentialsRepository.getCredentials(query.uuid)).pipe(
      concatMap((userCredentials) => {
        if (!userCredentials) {
          // UserCredentials must have been cleared
          throw new RpcException(
            new UnauthorizedException(`Invalid authentication`),
          );
        }
        const encryptionParameters = {
          iv: query.iv,
          key: query.key,
        };
        const username = this.encryptionService.decrypt(
          encryptionParameters,
          userCredentials.encryptedUsername,
        );

        const password = this.encryptionService.decrypt(
          encryptionParameters,
          userCredentials.encryptedPassword,
        );

        this.logger.debug(
          `Credentials found in Mongo for uuid ${query.uuid} : ${username}`,
        );

        return this.authService.authenticate({
          username,
          password,
        });
      }),
    );
  }

  public logoutAndDeleteCredentials(
    query: KeepAuthenticatedLogoutQueryDto,
  ): Observable<boolean> {
    return this.authService
      .logout({ authToken: query.authToken })
      .pipe(
        tap(() =>
          this.userCredentialsRepository.removeCredentialsById(query.uuid),
        ),
      );
  }

  public deleteCredentials(
    query: RemoveSavedCredentialsQueryDto,
  ): Observable<boolean> {
    return from(
      this.userCredentialsRepository
        .removeCredentialsById(query.uuid)
        .then(() => true)
        .catch(() => false),
    );
  }

  public reauthenticateIfNeeded(
    query: ReauthenticateIfNeededQueryDto,
  ): Observable<ReauthenticateIfNeededResultDto> {
    return this.authService
      .isAuthenticationValid({ authToken: query.authToken })
      .pipe(
        concatMap((isAuthenticationValid) => {
          if (isAuthenticationValid) {
            return of({
              reauthenticated: null,
            });
          }

          return this.reauthenticate(query).pipe(
            map((authenticated) => ({
              reauthenticated: authenticated,
            })),
          );
        }),
      );
  }

  @Cron(process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_SCHEDULE)
  async cleanupUnusedCredentials() {
    const limitDate = new Date();
    limitDate.setDate(
      limitDate.getDate() - this.credentialsCleanupNotUsedSinceInDays,
    );
    this.logger.log(
      `Removing credentials not used for ${this.credentialsCleanupNotUsedSinceInDays} days (since ${limitDate})`,
    );
    await this.userCredentialsRepository.removeCredentialsLastUsedBefore(
      limitDate,
    );
  }
}
