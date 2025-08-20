/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 * (dn-mobile-dev@univ-lorraine.fr)
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

import { Injectable } from '@nestjs/common';
import { LoginDirectus } from '@directus/collections/login/login.directus.model';
import { Login } from '@common/models/login.model';
import { DirectusService } from '@directus/directus.service';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { LoginSchema } from '@common/validation/schemas/login.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class LoginDirectusService {
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @ValidateMapping({ schema: LoginSchema })
  private mapToMultiModel(login: LoginDirectus): Login {
    return {
      translations: login.translations.map((translation) => ({
        languagesCode: translation.languages_code.code,
        notAuthenticatedText: normalizeEmptyStringToNull(
          translation.not_authenticated_text,
        ),
        connectionText: normalizeEmptyStringToNull(translation.connexion_text),
      })),
    };
  }

  async getLogin(): Promise<Login> {
    const cached = await this.cacheService.get<Login>(
      CacheCollection.LOGIN,
    );
    if (cached) {
      return cached;
    }

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
    const result = this.mapToMultiModel(data.login);
    await this.cacheService.set(CacheCollection.LOGIN, result);
    return result;
  }
}
