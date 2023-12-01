/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { NetworkService } from '@ul/shared';
import * as Leaflet from 'leaflet';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { MapModuleConfig, MAP_CONFIG } from './map.config';
import { Marker, markersList$, setMarkers } from './map.repository';
import { MapService } from './map.service';

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
    @Inject(MAP_CONFIG) private config: MapModuleConfig,
    private networkService: NetworkService,
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
        take(1),
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
    const permissionAlreadyGranted = (await Geolocation.checkPermissions()).location === 'granted';

    await Geolocation.getCurrentPosition().then(position => {
      let zoomLevel = 11;
      if(!permissionAlreadyGranted) { // Permission has just been granted now
        zoomLevel = 16;
      }
      const latLng: Leaflet.LatLngTuple = [position.coords.latitude, position.coords.longitude];
      const circle = Leaflet.circle(latLng, position.coords.accuracy);

      const icon = this.buildSimpleMarkerIcon();
      const popupContent = this.translateService.instant('MAP.YOUR_POSITION');
      const marker = Leaflet.marker(latLng, { icon })
        .bindPopup(`<div class="app-text-5">${popupContent}</div>`);
      if (this.positionLayerGroup) {
        this.positionLayerGroup.remove();
      }

      this.positionLayerGroup = Leaflet.layerGroup([circle, marker]).addTo(this.map);
      this.map.setView(latLng, zoomLevel);
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
    if (!(await this.networkService.getConnectionStatus()).connected) {
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
