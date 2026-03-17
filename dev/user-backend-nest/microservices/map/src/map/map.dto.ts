export interface MapDataJsonDto {
  icons: MapIconDto[];
  categories: MapCategoryDto[];
  campuses: CampusDto[];
  markersCollections: Record<string, Marker[]>;
}

export interface Marker {
  id: string;
  latitude: number;
  longitude: number;
  campusId: string | null;
  iconId: string | null;
  translations?: MapPointTranslationsDto[];
}

interface GpsCoordinate {
  lat: number;
  lng: number;
}

export interface CampusDto {
  id: string;
  name: string;
  photo: string | null;
  initial: GpsCoordinate;
  southwest: GpsCoordinate;
  northeast: GpsCoordinate;
}

export interface MapCategoryDto {
  id: string;
  translations?: MapCategoryTranslationsDto[];
}

export interface MapIconDto {
  id: string;
  svg: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface MapPointTranslationsDto {
  languagesCode: string;
  name: string;
  description: string | null;
}

export interface MapCategoryTranslationsDto {
  languagesCode: string;
  label: string;
}

// CMS (GraphQL) DTOs
export interface MapDataGraphQLDto {
  icons: MapIconDto[];
  categories: MapCategoryDto[];
  campuses: CampusDto[];
  featureCollections: Array<{
    categoryId: string;
    features: FeatureDto[];
  }>;
}

export interface FeatureDto {
  id: string;
  campusId: string | null;
  iconId: string | null;
  location: GpsCoordinate;
  translations?: MapPointTranslationsDto[];
}

export interface MapDataGraphQLResponse {
  data: {
    mapData: MapDataGraphQLDto;
  };
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
}

// Additional Provider DTOs
export interface MapCategoryAdditionalProviderDto {
  id: string;
  label: Array<{
    langcode: string;
    value: string;
  }>;
}

// GeoJSON Feature
export interface FeatureAdditionalProviderDto {
  type: 'Feature';
  properties: {
    name: Array<{
      langcode: string;
      value: string;
    }>;
    description: Array<{
      langcode: string;
      value: string;
    }>;
    site: string;
    icon: {
      svg: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface MapDataAdditionalProviderDto {
  categories: MapCategoryAdditionalProviderDto[];
  campuses: CampusDto[];
  pois: Record<
    string,
    {
      type: 'FeatureCollection';
      features: FeatureAdditionalProviderDto[];
    }
  >;
}
