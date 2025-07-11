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

import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CmsConfigError } from './cms.exception';

const logger = new Logger('CmsConfig');

export const cmsConfig = registerAs('cms', async () => {
  const defaultCms = process.env.DEFAULT_CMS || 'wordpress';
  logger.debug(`Loading configuration for CMS: ${defaultCms}`);

  const configPath = `./${defaultCms}/config/${defaultCms}.config`;
  logger.debug(`Attempting to import config from: ${configPath}`);

  let cmsModuleConfig: { default: () => any };

  try {
    cmsModuleConfig = await import(configPath);
  } catch (error) {
    const errorMessage = `Failed to load configuration for CMS: ${defaultCms}`;
    logger.error(errorMessage, error.stack);
    throw new CmsConfigError(errorMessage);
  }

  if (!cmsModuleConfig?.default) {
    const errorMessage = `Invalid config file structure for ${defaultCms}. Config file must have a default export.`;
    logger.error(errorMessage);
    throw new CmsConfigError(errorMessage);
  }

  const config = cmsModuleConfig.default();
  logger.log(`Successfully loaded configuration for ${defaultCms}`);

  return config;
});
