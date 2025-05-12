export interface LocalisedString {
  value: string;
  langcode: string;
}

export interface Category {
  id: string;
  label: LocalisedString[];
}
