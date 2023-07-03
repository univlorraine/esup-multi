export interface RestaurantExternalApiDTO {
  id: number;
  title: string;
  short_desc: string;
  opening: Record<string, RestaurantOpeningExternalApi>;
  lat: number;
  lon: number;
  thumbnail_url: string;
  contact: string;
  infos: string;
  zone: string;
}

export interface RestaurantDTO {
  id: number;
  title: string;
  shortDesc: string;
  opening: Record<string, RestaurantOpening>;
  latitude: number;
  longitude: number;
  thumbnailUrl: string;
  contact: string;
  infos: string;
  zone: string;
}

export interface RestaurantMenusQueryDto {
  id: string;
  date: Date;
}

export interface RestaurantMenu {
  date: string;
  meal: Meal[];
}

export interface Meal {
  name: string;
  foodcategory: FoodCategory[];
}

export interface FoodCategory {
  name: string;
  dishes: string[];
}

export interface RestaurantOpeningExternalApi {
  label: string;
  is_open: boolean;
}

export interface RestaurantOpening {
  label: string;
  isOpen: boolean;
}
