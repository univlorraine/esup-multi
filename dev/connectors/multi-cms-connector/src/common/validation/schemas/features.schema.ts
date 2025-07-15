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

import { z } from 'zod';

import { IdSchema, AccessTypeSchema } from './base-type.schema';
import { FeaturesTranslationsSchema } from '@common/validation/schemas/translations.schema';
import { AuthorizationSchema } from '@common/validation/schemas/authorization.schema';
import { SettingsByRoleSchema } from '@common/validation/schemas/settingsByRole.schema';

export const FeaturesSchema = z
  .object({
    id: IdSchema,
    description: z
      .string()
      .min(1, 'Feature description cannot be empty string')
      .nullable(),
    icon: z.string().min(1, 'Feature icon cannot be empty string').nullable(),
    iconSvgDark: z
      .string()
      .min(1, 'Feature icon svg dark cannot be empty string')
      .nullable(),
    iconSvgLight: z
      .string()
      .min(1, 'Feature icon svg light cannot be empty string')
      .nullable(),
    link: z.string().min(1, 'Feature link cannot be empty string').nullable(),
    menu: z.enum(['tabs', 'service', 'burger', 'top'], {
      errorMap: () => ({
        message: 'Menu must be one of tabs, service, burger, or top',
      }),
    }),
    position: z.number().int().default(0),
    routerLink: z
      .string()
      .min(1, 'Feature router link cannot be empty string')
      .nullable(),
    ssoService: z
      .string()
      .min(1, 'Feature SSO service cannot be empty string')
      .nullable(),
    statisticName: z
      .string()
      .min(1, 'Feature statistic name cannot be empty string')
      .nullable(),
    type: AccessTypeSchema,
    translations: z
      .array(FeaturesTranslationsSchema)
      .min(1, 'At least one translation is required for Features'),
    authorization: AuthorizationSchema.nullable(),
    settingsByRole: z.array(SettingsByRoleSchema),
  })
  .refine(
    (data) => {
      if (data.type === 'internal') {
        return data.routerLink !== null; // routerLink doit exister pour internal
      }
      if (data.type === 'external') {
        return data.link !== null; // link requis pour external
      }
      return true;
    },
    {
      message:
        'Internal features require routerLink, external features require link',
      path: ['type'],
    },
  );
