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

export const BaseTranslationsSchema = z.object({
  languagesCode: z
    .string()
    .min(2, 'Language code must be must be a two-letter ISO code')
    .regex(/^[a-z]{2,}$/, 'Language code must be lowercase letters only'),
});

export const ChannelsTranslationsSchema = BaseTranslationsSchema.extend({
  label: z.string().nonempty().min(1, 'Channel label is required'),
});

export const ContactUsTranslationsSchema = BaseTranslationsSchema.extend({
  title: z.string().nonempty().min(1, 'Contact Us title is required'),
  content: z.string().nonempty().min(1, 'Contact Us content is required'),
});

export const FeaturesTranslationsSchema = BaseTranslationsSchema.extend({
  title: z.string().min(1, 'Feature title cannot be empty string').nullable(),
  shortTitle: z
    .string()
    .min(1, 'Feature short title cannot be empty string')
    .nullable(),
  searchKeywords: z
    .array(z.string().min(1, 'Feature keywords cannot be empty array'))
    .nullable(),
});

export const ImportantNewsTranslationsSchema = BaseTranslationsSchema.extend({
  title: z.string().min(1, 'Important New title cannot be empty string'),
  content: z.string().min(1, 'Important New content cannot be empty string'),
  buttonLabel: z
    .string()
    .min(1, 'Important New button label cannot be empty string')
    .nullable(),
});

export const LoginTranslationsSchema = BaseTranslationsSchema.extend({
  notAuthenticatedText: z
    .string()
    .min(1, 'Login not authenticated text cannot be empty string')
    .nullable(),
  connectionText: z
    .string()
    .min(1, 'Login connection text cannot be empty string')
    .nullable(),
});

export const StaticPagesTranslationsSchema = BaseTranslationsSchema.extend({
  title: z.string().min(1, 'Static Page title cannot be empty string'),
  content: z.string().min(1, 'Static Page content cannot be empty string'),
});

export const WidgetsTranslationsSchema = BaseTranslationsSchema.extend({
  title: z.string().min(1, 'Widget title cannot be empty string').nullable(),
  content: z
    .string()
    .min(1, 'Widget content cannot be empty string')
    .nullable(),
});
