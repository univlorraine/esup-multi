/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
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

// Commun
export type AppElement = Feature | Widget;

export enum AccessType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}

export interface SettingsByRole {
  role: string;
  position: number;
}

export interface BaseElement {
  id: string;
  type: AccessType;
  icon?: string;
  iconSvgLight?: string;
  iconSvgDark?: string;
  position: number | null;
  statisticName?: string;
  authorization: Authorization | null;
  settingsByRole: SettingsByRole[];
}

// Features
export interface FeatureTranslation {
  languagesCode: string;
  title?: string;
  shortTitle?: string;
  searchKeywords?: string[];
}

export interface BaseFeature extends BaseElement {
  menu: string | null;
  translations: FeatureTranslation[];
}

export interface InternalFeature extends BaseFeature {
  type: AccessType.INTERNAL;
  routerLink: string;
}

export interface ExternalFeature extends BaseFeature {
  type: AccessType.EXTERNAL;
  link?: string;
  ssoService?: string;
}

export type Feature = InternalFeature | ExternalFeature;

// Widgets
export interface WidgetTranslation {
  languagesCode: string;
  title?: string;
  content?: string;
}

export interface BaseWidget extends BaseElement {
  widget?: string;
  color?: string;
  translations: WidgetTranslation[];
}

export interface InternalWidget extends BaseWidget {
  type: AccessType.INTERNAL;
  routerLink: string;
}

export interface ExternalWidget extends BaseWidget {
  type: AccessType.EXTERNAL;
  link?: string;
  ssoService?: string;
}

export type Widget = InternalWidget | ExternalWidget;

// GraphQL
export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
}

export interface ContentQueryResponse {
  features: Feature[];
  widgets: Widget[];
}
