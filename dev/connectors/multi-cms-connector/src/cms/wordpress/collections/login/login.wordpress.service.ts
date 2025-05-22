import { Injectable } from '@nestjs/common';
import { Login } from '@common/models/login.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { LoginTranslations } from '@common/models/translations.model';
import { LoginTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { LoginWordpress } from '@wordpress/collections/login/login.wordpress.model';

const FRENCH_CODE = 'FR';
@Injectable()
export class LoginWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(login: LoginWordpress): Login {
    const frTranslation: LoginTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      connectionText: login.loginConnectionText,
      notAuthenticatedText: login.loginNotAuthenticatedText,
    };

    const translations: LoginTranslations[] = [
      frTranslation,
      ...(login.translations.map((translation: LoginTranslationsWordpress) => ({
        id: translation.databaseId,
        languagesCode: translation.language.code.toLowerCase(),
        connectionText: translation.loginConnectionText,
        notAuthenticatedText: translation.loginNotAuthenticatedText,
      })) || []),
    ];

    return {
      translations,
    };
  }

  async getLogin(): Promise<Login> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        login(where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            loginConnectionText
            loginNotAuthenticatedText
            translations {
              databaseId
              language {
                code
                locale
                name
              }
              loginConnectionText
              loginNotAuthenticatedText
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.login.nodes[0]);
  }
}
