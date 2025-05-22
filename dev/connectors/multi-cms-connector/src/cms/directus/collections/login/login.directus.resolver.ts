import { Query, Resolver } from '@nestjs/graphql';
import { LoginDirectusService } from './login.directus.service';
import { Login } from '@common/models/login.model';


@Resolver(() => Login)
export class LoginDirectusResolver {
  constructor(private readonly loginService: LoginDirectusService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => Login, { name: 'login' })
  async getContactUs(): Promise<Login> {
    return this.loginService.getLogin();
  }
}
