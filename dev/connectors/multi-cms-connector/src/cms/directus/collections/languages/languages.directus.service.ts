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
import { LanguagesDirectus } from './languages.directus.model';
import { Languages } from '@common/models/languages.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class LanguagesDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(language: LanguagesDirectus): Languages {
    return {
      name: language.name,
      direction: language.direction,
      code: language.code,
      locale: null,
    };
  }

  async getLanguages(): Promise<Languages[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        languages {
          code
          direction
          name
        }
      }
    `);
    return data.languages.map(this.mapToMultiModel);
  }

  async getLanguage(code: string): Promise<Languages> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        languages(filter: { code: { _eq: "${code}" } }) {
          code
          direction
          name
        }
      }
    `);
    return this.mapToMultiModel(data.languages[0]);
  }
}
