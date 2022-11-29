import { Controller } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { KeepAuthService } from './keep-auth.service';
import {
  KeepAuthenticatedDto,
  ReauthenticateQueryDto,
  KeepAuthenticatedLogoutQueryDto,
  ReauthenticateIfNeededQueryDto,
  ReauthenticateIfNeededResultDto,
  RemoveSavedCredentialsQueryDto,
} from './keep-auth.dto';
import { AuthenticatedDto, AuthenticateQueryDto } from '../auth/auth.dto';

@Controller()
export class KeepAuthController {
  constructor(private keepAuthService: KeepAuthService) {}

  @MessagePattern({ cmd: 'authenticateAndSaveCredentials' })
  authenticateAndSaveCredentials(
    query: AuthenticateQueryDto,
  ): Observable<KeepAuthenticatedDto> {
    return this.keepAuthService.authenticateAndSaveCredentials(query);
  }

  @MessagePattern({ cmd: 'reauthenticateUsingSavedCredentials' })
  reauthenticateUsingSavedCredentials(
    query: ReauthenticateQueryDto,
  ): Observable<AuthenticatedDto> {
    return from(this.keepAuthService.reauthenticate(query));
  }

  @MessagePattern({ cmd: 'logoutAndDeleteCredentials' })
  logoutAndDeleteCredentials(
    query: KeepAuthenticatedLogoutQueryDto,
  ): Observable<boolean> {
    return from(this.keepAuthService.logoutAndDeleteCredentials(query));
  }

  @MessagePattern({ cmd: 'deleteCredentials' })
  deleteCredentials(
    query: RemoveSavedCredentialsQueryDto,
  ): Observable<boolean> {
    return from(this.keepAuthService.deleteCredentials(query));
  }

  @MessagePattern({ cmd: 'reauthenticateIfNeeded' })
  reauthenticateIfNeeded(
    query: ReauthenticateIfNeededQueryDto,
  ): Observable<ReauthenticateIfNeededResultDto> {
    return from(this.keepAuthService.reauthenticateIfNeeded(query));
  }
}
