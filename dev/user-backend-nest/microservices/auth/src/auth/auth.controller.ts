import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoginPageContentResultDto } from 'src/page-content/login-page-content/login-page-content.dto';
import {
  AuthenticatedDto,
  AuthenticateQueryDto,
  GetUserQueryDto,
  GetUserResultDto,
  LogoutQueryDto,
  SsoServiceTokenQueryDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'authenticate' })
  authenticate(data: AuthenticateQueryDto): Observable<AuthenticatedDto> {
    return this.authService.authenticate(data);
  }

  @MessagePattern({ cmd: 'logout' })
  logout(data: LogoutQueryDto): Observable<boolean> {
    return this.authService.logout(data);
  }

  @MessagePattern({ cmd: 'requestSsoServiceToken' })
  requestSsoServiceToken(data: SsoServiceTokenQueryDto): Observable<string> {
    return this.authService.requestSsoServiceToken(data);
  }

  @MessagePattern({ cmd: 'getUser' })
  getUser(data: GetUserQueryDto): Observable<GetUserResultDto | null> {
    return this.authService.getUser(data);
  }

  @MessagePattern({ cmd: 'getUserOrThrowError' })
  getUserOrThrowError(data: GetUserQueryDto): Observable<GetUserResultDto> {
    return this.authService.getUserOrThrowError(data);
  }

  @MessagePattern({ cmd: 'loginPageContent' })
  getLoginPageContent(): Observable<LoginPageContentResultDto> {
    return this.authService.getPageContent();
  }
  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }
}
