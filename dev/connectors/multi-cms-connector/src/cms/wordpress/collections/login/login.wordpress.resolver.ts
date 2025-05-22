import { Query, Resolver } from '@nestjs/graphql';
import { LoginWordpressService } from './login.wordpress.service';
import { Login } from '@common/models/login.model';

@Resolver(() => Login)
export class LoginWordpressResolver {
  constructor(private readonly loginService: LoginWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => Login, { name: 'login' })
  async getLogin(): Promise<Login> {
    return this.loginService.getLogin();
  }
}
