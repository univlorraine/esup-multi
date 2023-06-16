import {Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { finalize, first, takeUntil } from 'rxjs/operators';
import { MapModuleConfig, MAP_CONFIG } from './map.config';
import { Marker, markersList$, setMarkers } from './map.repository';
import { MapService } from './map.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

const CATEGORIES = [
  'presidences_points',
  'composantes_points',
  'bus_points',
  'restos_points',
  'cites_points',
  'santes_points',
  'suaps_points'
];

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnDestroy {

  @ViewChild('popover') popover;

  public isOpen = false;
  public isLoading = false;
  public form: FormGroup;
  public categoriesSelected: string[];
  protected readonly categories = CATEGORIES;
  private map: Leaflet.Map;
  private markersByCategory: Map<string, Leaflet.Marker[]> = new Map();
  private layerGroupByCategory: Map<string, Leaflet.LayerGroup> = new Map();
  private positionLayerGroup: Leaflet.LayerGroup;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private mapService: MapService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    @Inject(MAP_CONFIG) private config: MapModuleConfig
  ) {
    this.initCategoriesForm();

    this.categoriesForm.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(formValues => {
      this.categoriesSelected = CATEGORIES.filter((value, index) => formValues[index]);
      this.refreshMap();
    });
  }

  get categoriesForm(): FormArray {
    return this.form.get('categoriesForm') as FormArray;
  }

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

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onLocateUserClick() {
    this.refreshUserPosition();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  getCategoryTranslation(category: string) {
    switch (category) {
      case 'presidences_points':
        return 'MAP.CATEGORY.PRESIDENCES';
      case 'composantes_points':
        return 'MAP.CATEGORY.COMPOSANTES';
      case 'bus_points':
        return 'MAP.CATEGORY.BUS';
      case 'restos_points':
        return 'MAP.CATEGORY.RESTOS';
      case 'cites_points':
        return 'MAP.CATEGORY.CITES';
      case 'santes_points':
        return 'MAP.CATEGORY.SANTES';
      case 'suaps_points':
        return 'MAP.CATEGORY.SUAPS';
    }
  }

  removeSelectedCategory(category: string, selectedCatIndex: number ) {
    this.categoriesSelected.splice(selectedCatIndex, 1);
    this.refreshMap();

    const newValue = [...this.categoriesForm.value];
    newValue[CATEGORIES.indexOf(category)] = false;
    this.categoriesForm.setValue(newValue);
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
      if (categories.length === 0 || categories.indexOf(category) >= 0) {
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
      this.map.setZoom(11);
    },
      error => {
        const latLngOfTheUniversity: Leaflet.LatLngTuple = [this.config.defaultMapLocation.latitude,
          this.config.defaultMapLocation.longitude];
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
      .bindPopup(
        `<h4 class="app-title-4">${m.title}</h4><br>
        <div class="app-text-5">${m.description}</div>`
      );

    markersInCategory.push(marker);
  }

  private getIconFileByCategory(category: string) {
    switch (category) {
      case 'presidences_points':
        return 'presidence.png';
      case 'composantes_points':
        return 'composante.png';
      case 'bus_points':
        return 'bu.png';
      case 'restos_points':
        return 'resto_u.png';
      case 'cites_points':
        return 'cite_u.png';
      case 'santes_points':
        return 'sante.png';
      case 'suaps_points':
        return 'suap.png';
      default:
        return 'composante.png'; //default icon for unknown category
    }
  }

  private buildIconForCategory(category: string) {
    const iconFile = this.getIconFileByCategory(category);
    const iconUrl = `./assets/map/markers/${iconFile}`;

    return Leaflet.icon({
      iconUrl,
      iconSize: [34, 48], // size of the icon
      iconAnchor: [18, 48], // point of the icon which will correspond to marker's location
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

  private refreshMap() {
    this.refreshMapWithSelectedCategories(this.categoriesSelected);
  }

  private initCategoriesForm() {
    this.form = this.formBuilder.group({
      categoriesForm: this.formBuilder.array([]) ,
    });

    this.categoriesForm.clear();
    CATEGORIES.forEach(() => this.categoriesForm.push(new FormControl(false)));
  }
}
