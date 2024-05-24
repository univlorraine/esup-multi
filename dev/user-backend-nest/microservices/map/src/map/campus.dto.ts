export interface GpsCoordinate {
  lat: number;
  lng: number;
}

export interface Campus {
  id: number;
  name: string;

  initial: GpsCoordinate;

  southwest: GpsCoordinate;
  northeast: GpsCoordinate;
}
