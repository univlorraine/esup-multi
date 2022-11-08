import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import * as geoJsonData from './map-data.json';
import { Marker } from './marker.dto';

@Injectable()
export class MapService {
  getMarkers(): Observable<Marker[]> {
    const markersList: Marker[] = [];
    for (const category in geoJsonData) {
      const markers: Marker[] = geoJsonData[category].features.map(
        (feature) => {
          let description = '';
          Object.entries(feature.properties).forEach(
            ([property, value]: [string, string]) => {
              if (property === 'Nom') {
                return;
              }

              if (value.startsWith('https://') || value.startsWith('http://')) {
                value = `<a href="${value}" target="_blank">${value}</a>`;
              }

              description += `${value}<br />`;
            },
          );

          return {
            category,
            title: feature.properties.Nom,
            description,
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          };
        },
      );

      markersList.push(...markers);
    }

    return of(markersList);
  }
}
