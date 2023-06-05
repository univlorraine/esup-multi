export interface RestaurantExternalApiDTO {
  id: number;
  title: string;
  short_desc: string;
  opening: string;
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
  opening: string;
  open: boolean;
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
