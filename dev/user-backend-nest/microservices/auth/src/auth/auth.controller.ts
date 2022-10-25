import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AuthenticatedDto,
  AuthenticateQueryDto,
  LogoutQueryDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
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
}
