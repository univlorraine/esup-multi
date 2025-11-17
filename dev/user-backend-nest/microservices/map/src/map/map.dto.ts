export interface MapDataJsonDto {
  icons: MapIconDto[];
  categories: MapCategoryDto[];
  campuses: CampusDto[];
  markersCollections: Record<string, Marker[]>;
}

export interface MapDataGraphQLDto {
  icons: MapIconDto[];
  categories: MapCategoryDto[];
  campuses: CampusDto[];
  featureCollections: Array<{
    categoryId: string;
    features: FeatureDto[];
  }>;
}

export interface Marker {
  id: string;
  latitude: number;
  longitude: number;
  campusId: string;
  iconId: string;
  translations?: MapPointTranslationsDto[];
}

interface GpsCoordinate {
  lat: number;
  lng: number;
}

export interface FeatureDto {
  id: string;
  categoryId: string;
  campusId: string;
  iconId: string;
  location: GpsCoordinate;
  translations?: MapPointTranslationsDto[];
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
