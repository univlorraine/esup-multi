import { Feature } from './features.dto';

export class FeaturesPositionHelper {
  constructor(private userRoles: string[]) {}

  public getFeaturePosition(feature: Feature): number {
    const settingsByRole = feature.settings_by_role.find((sbr) =>
      this.userRoles.includes(sbr.role),
    );

    if (settingsByRole) {
      return settingsByRole.position;
    } else if (feature.position) {
      return feature.position;
    } else {
      return Number.MAX_SAFE_INTEGER;
    }
  }
}
