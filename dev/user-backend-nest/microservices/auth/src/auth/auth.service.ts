import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { concatWith, map, toArray } from 'rxjs/operators';
import {
  AuthenticatedDto,
  AuthenticateQueryDto,
  LogoutQueryDto,
  UserProfileDto,
} from './auth.dto';
import { CasService } from './cas.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly casService: CasService,
    private readonly userService: UserService,
  ) {}

  authenticate(query: AuthenticateQueryDto): Observable<AuthenticatedDto> {
    return this.casService.requestTgt(query).pipe(
      concatWith(this.userService.getUserProfile(query.username)),
      toArray(),
      map((res) => {
        const tgt = res[0] as string;
        const userProfile = res[1] as UserProfileDto;

        return {
          username: query.username,
          authToken: tgt,
          ...userProfile,
        };
      }),
    );
  }

  logout(query: LogoutQueryDto): Observable<boolean> {
    return this.casService.logout(query.authToken);
  }
}
