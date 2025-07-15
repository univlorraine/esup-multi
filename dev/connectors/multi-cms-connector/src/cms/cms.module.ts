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

import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cmsConfig } from './cms.config';
import { CmsConfigError } from './cms.exception';
import { CmsService } from './cms.service';
import { DirectusModule } from '@directus/directus.module';
import { WordpressModule } from '@wordpress/wordpress.module';

const CMS_MODULES = {
  wordpress: WordpressModule,
  directus: DirectusModule,
  // strapi: StrapiModule,
} as const;

type CmsType = keyof typeof CMS_MODULES;

@Module({})
export class CmsModule {
  private static readonly logger = new Logger('CmsModule');

  static register(): DynamicModule {
    const defaultCms = (process.env.DEFAULT_CMS || 'wordpress') as CmsType;
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`Attempting to load CMS: ${defaultCms}`);
    }

    const selectedModule = CMS_MODULES[defaultCms];
    if (!selectedModule) {
      const availableCms = Object.keys(CMS_MODULES).join(', ');
      throw new CmsConfigError(
        `Invalid CMS "${defaultCms}". Available options: ${availableCms}`,
      );
    }

    this.logger.log(`Successfully loaded CMS Module: ${defaultCms}`);

    return {
      module: CmsModule,
      imports: [ConfigModule.forFeature(cmsConfig), selectedModule],
      providers: [CmsService],
      exports: [CmsService, selectedModule],
    };
  }
}
