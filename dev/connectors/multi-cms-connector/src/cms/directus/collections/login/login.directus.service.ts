import { Injectable } from '@nestjs/common';
import { LoginDirectus } from '@directus/collections/login/login.directus.model';
import { Login } from '@common/models/login.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class LoginDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(login: LoginDirectus): Login {
    return {
      translations: login.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        notAuthenticatedText: translation.not_authenticated_text,
        connectionText: translation.connexion_text,
      })),
    };
  }

  async getLogin(): Promise<Login> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        login {
          id
          translations {
              id
              languages_code {
                  name
                  code
                  direction
              }
              connexion_text
              not_authenticated_text
          }
        }
      }
    `);
    return this.mapToMultiModel(data.login);
  }
}
