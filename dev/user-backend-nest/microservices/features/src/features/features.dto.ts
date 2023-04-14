export interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}

export interface FeatureTranslation {
  languages_code: string;
  title?: string;
  shortTitle?: string;
  content?: string;
  searchKeywords?: string[];
}

export enum FeatureType {
  Internal = 'internal',
  External = 'external',
}

export interface SettingsByRole {
  role: string;
  position: number;
}

interface FeatureCommon<SBR> {
  id: string;
  type: FeatureType;
  position: number | null;
  widget?: string;
  translations: FeatureTranslation[];
  authorization: Authorization | null;
  settings_by_role: SBR[];
  menu: string | null;
  icon?: string;
}

export interface ExternalFeature extends FeatureCommon<SettingsByRole> {
  link?: string;
  ssoService?: string;
  type: FeatureType.External;
}

export interface InternalFeature extends FeatureCommon<SettingsByRole> {
  routerLink: string;
  type: FeatureType.Internal;
}

export type Feature = ExternalFeature | InternalFeature;

interface DirectusSettingsByRole {
  settings_by_role_id: SettingsByRole;
}

export interface DirectusExternalFeature
  extends FeatureCommon<DirectusSettingsByRole> {
  link?: string;
  ssoService?: string;
  type: FeatureType.External;
}

export interface DirectusInternalFeature
  extends FeatureCommon<DirectusSettingsByRole> {
  routerLink: string;
  type: FeatureType.Internal;
}

export type DirectusFeature = DirectusExternalFeature | DirectusInternalFeature;
