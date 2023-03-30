import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { FeaturesPositionHelper } from './features-position.helper';
import { DirectusFeature, Feature } from './features.dto';
import { DirectusApi } from '../config/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';

interface DirectusResponse<T> {
  data: T;
}

@Injectable()
export class FeaturesService {
  private readonly logger = new Logger(FeaturesService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getFeatures(userRoles: string[]): Observable<Feature[]> {
    const url = `${this.directusApiConfig.apiUrl}/items/features`;
    const requestConfig = {
      params: {
        'filter[status][_eq]': 'published',
        fields:
          '*,translations.*,authorization.*,settings_by_role.settings_by_role_id.*',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
      },
    };

    const featuresPositionHelper = new FeaturesPositionHelper(userRoles);
    const sortFeatures = (a: Feature, b: Feature) => {
      const positionA = featuresPositionHelper.getFeaturePosition(a);
      const positionB = featuresPositionHelper.getFeaturePosition(b);
      return positionA - positionB;
    };

    const directusFeaturesToFeatures = (feature: DirectusFeature): Feature => {
      return {
        ...feature,
        settings_by_role: feature.settings_by_role.map(
          (sbr) => sbr.settings_by_role_id,
        ),
      };
    };

    return this.httpService
      .get<DirectusResponse<DirectusFeature[]>>(url, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus features';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
        map((features: DirectusFeature[]): Feature[] =>
          features.map(directusFeaturesToFeatures),
        ),
        map((features: Feature[]) => features.sort(sortFeatures)),
      );
  }
}
