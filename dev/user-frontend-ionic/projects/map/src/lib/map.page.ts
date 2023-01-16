import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { finalize, first } from 'rxjs/operators';
import { Marker, markersList$, setMarkers } from './map.repository';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  public isLoading = false;
  private map: Leaflet.Map;
  private markersByCategory: Map<string, Leaflet.Marker[]> = new Map();
  private layerGroupByCategory: Map<string, Leaflet.LayerGroup> = new Map();
  private positionLayerGroup: Leaflet.LayerGroup;

  constructor(
    private mapService: MapService,
    private translateService: TranslateService,
  ) { }

  async ionViewDidEnter() {
    this.isLoading = true;
    await this.loadMarkersInNetworkAvailable();
    await this.leafletMapInit();
    markersList$
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe(markers => this.initMarkers(markers));
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  onCategoryFilterChange(e) {
    this.refreshMapWithSelectedCategories(e.detail.value);
  }

  onLocateUserClick() {
    this.refreshUserPosition();
  }

  private async leafletMapInit() {
    this.map = Leaflet.map('map').setView([0, 0], 9);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    await this.refreshUserPosition();
  }

  private refreshMapWithSelectedCategories(categories: string[]) {
    this.layerGroupByCategory.forEach((layerGroup, category) => {
      layerGroup.removeFrom(this.map);
      if (categories.indexOf(category) >= 0) {
        layerGroup.addTo(this.map);
      }
    });
  }

  private async refreshUserPosition() {

    await Geolocation.getCurrentPosition().then(position => {
      const latLng: Leaflet.LatLngTuple = [position.coords.latitude, position.coords.longitude];
      const circle = Leaflet.circle(latLng, position.coords.accuracy);

      const icon = this.buildSimpleMarkerIcon();
      const popupContent = this.translateService.instant('MAP.YOUR_POSITION');
      const marker = Leaflet.marker(latLng, { icon })
        .bindPopup(popupContent);
      if (this.positionLayerGroup) {
        this.positionLayerGroup.remove();
      }

      this.positionLayerGroup = Leaflet.layerGroup([circle, marker]).addTo(this.map);
      this.map.setView(latLng);
      this.map.setZoom(11)
    },
      error => {
        const latLngOfTheUniversity: Leaflet.LatLngTuple = [48.69137200828818, 6.183309429175067]
        if (this.positionLayerGroup) {
          this.positionLayerGroup.remove();
        }
        this.map.setView(latLngOfTheUniversity);
      });
  }

  private async loadMarkersInNetworkAvailable() {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    const markers = await this.mapService.getMarkers().toPromise();
    setMarkers(markers);
  }

  private initMarkers(markers: Marker[]) {
    markers.forEach(m => this.initMarker(m));

    this.markersByCategory.forEach((markersInCategory, category) => {
      const layerGroup = Leaflet.layerGroup(markersInCategory);
      this.layerGroupByCategory.set(category, layerGroup);
      layerGroup.addTo(this.map);
    });
  }

  private initMarker(m: Marker) {
    if (!this.markersByCategory.has(m.category)) {
      this.markersByCategory.set(m.category, []);
    }
    const markersInCategory = this.markersByCategory.get(m.category);

    const icon = this.buildIconForCategory(m.category);
    const marker = Leaflet.marker([m.latitude, m.longitude], { icon })
      .bindPopup(`<h4>${m.title}</h4><br>
      ${m.description}`
      );

    markersInCategory.push(marker);
  }


  private getIconFileByCategory(category: string) {
    switch (category) {
      case 'presidences_points':
        return 'home.svg';
      case 'composantes_points':
        return 'composantes.png';
      case 'bus_points':
        return 'bus.png';
      case 'restos_points':
        return 'restos.png';
      case 'cites_points':
        return 'cites.png';
      case 'santes_points':
        return 'santes.png';
      case 'santes_points':
        return 'swap.png';
      default:
        return 'home.svg'; //default icon for unknown category
    }
  }

  private buildIconForCategory(category: string) {
    const iconFile = this.getIconFileByCategory(category);
    const iconUrl = `./assets/map/markers/${iconFile}`;

    return Leaflet.icon({
      iconUrl,
      iconSize: [41, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    });
  }

  private buildSimpleMarkerIcon() {
    return Leaflet.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: './assets/map/leaflet/marker-icon.png',
      iconRetinaUrl: './assets/map/leaflet/marker-icon-2x.png',
      shadowUrl: './assets/map/leaflet/marker-shadow.png'
    });
  }
}


