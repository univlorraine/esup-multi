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
  UserProfileDto,
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
      .logout(query)
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
