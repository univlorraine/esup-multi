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
import { NetworkService, currentLanguage$ } from '@multi/shared';
import * as Leaflet from 'leaflet';
import { Subject, combineLatest } from 'rxjs';
import { finalize, map, take, takeUntil } from 'rxjs/operators';
import { MapModuleConfig, MAP_CONFIG } from './map.config';
import { Campus, Categorie, Label, Marker, campusList$, categoriesList$, markersList$, setCampus, setCategories, setMarkers } from './map.repository';
import { MapService } from './map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/map/map.page.scss'],
})
export class MapPage implements OnDestroy {

  @ViewChild('popover') popover;

  public isOpen = false;
  public isLoading = false;
  public form: FormGroup;
  public categoriesSelected: string[];
  public categories: Categorie[];
  public campus: Campus[];
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
    @Inject('environment')
    private environment: any,
  ) { }

  get categoriesForm(): FormArray {
    return this.form.get('categoriesForm') as FormArray;
  }

  async ionViewDidEnter() {
    this.isLoading = true;
    await this.loadMapDataInNetworkAvailable();

    combineLatest([categoriesList$, currentLanguage$])
      .pipe(
        take(1),
        map(([categories, currentLanguage]) => this.translateCategories(categories, currentLanguage))
      )
      .subscribe(categories => this.categories = categories);

    this.initCategoriesForm();
    this.categoriesForm.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(formValues => {
      this.categoriesSelected = this.categories.filter((value, index) => formValues[index]).map(value => value.id);
      this.refreshMap();
    });

    campusList$
      .pipe(
        take(1)
      )
      .subscribe(campus => this.campus = campus);
      
    await this.leafletMapInit();
    combineLatest([markersList$, currentLanguage$])
      .pipe(
        take(1),
        map(([markers, currentLanguage]) => this.translateMarkers(markers, currentLanguage)),
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
    return this.categories.find(cat => cat.id === category).label_translate;
  }

  removeSelectedCategory(category: string, selectedCatIndex: number) {
    this.categoriesSelected.splice(selectedCatIndex, 1);
    this.refreshMap();

    const newValue = [...this.categoriesForm.value];
    newValue[this.categories.findIndex(cat => cat.id === category)] = false;
    this.categoriesForm.setValue(newValue);
  }

  private async leafletMapInit() {
    this.map = Leaflet.map('map', {
      center: [0, 0],
      zoom: this.config.minZoom > 9 ? this.config.minZoom : 9,
      maxBoundsViscosity: 0.5
    });

    let mapType = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    if(this.config.mapType === "osm"){
      mapType = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }else if(this.config.mapType === "mapbox"){
      mapType = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}";
    }
    Leaflet.tileLayer(mapType, {
      id: this.config.mapType === "mapbox" ? "mapbox/streets-v12" : "",
      minZoom: this.config.minZoom,
      maxZoom: this.config.maxZoom,
      tileSize: this.config.mapType === "mapbox" ? 512 : 256,
      zoomOffset: this.config.mapType === "mapbox" ? -1 : 0,
      accessToken: this.config.accessToken,
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

    try {
      const position = await Geolocation.getCurrentPosition({enableHighAccuracy: this.config.highAccuracy});
      let zoomLevel = this.config.minZoom > 11 ? this.config.minZoom : 11;
      if (!permissionAlreadyGranted) { // Permission has just been granted now
        zoomLevel = this.config.minZoom > 16 ? this.config.minZoom : 16;
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
      if (this.config.maxBounds) this.map.setMaxBounds(null);
      this.map.setView(latLng, zoomLevel);
    } catch (error) {
      console.error('Error getting current position:', error);
      const latLngOfTheUniversity: Leaflet.LatLngTuple = [this.config.defaultMapLocation.latitude, this.config.defaultMapLocation.longitude];
      if (this.positionLayerGroup) {
        this.positionLayerGroup.remove();
      }
      if (this.config.maxBounds) this.map.setMaxBounds(null);
      this.map.setView(latLngOfTheUniversity);
    }
  }

  private async loadMapDataInNetworkAvailable() {
    // skip if network is not available
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    const markers = await this.mapService.getMarkers().toPromise();
    setMarkers(markers);
    const categories = await this.mapService.getCategories().toPromise();
    setCategories(categories);
    const campus = await this.mapService.getCampus().toPromise();
    setCampus(campus);
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

    const icon = this.buildIconForCategory(m);
    const marker = Leaflet.marker([m.latitude, m.longitude], { icon })
      .bindPopup(
        `<h5 class="app-title-5">${m.title_translate}</h5>
        <div class="app-text-5">${m.description_translate ? m.description_translate : ''}</div>`
      );

    markersInCategory.push(marker);
  }

  private buildIconForCategory(m: Marker) {
    if(!m.icon.svg) {
      return this.buildSimpleMarkerIcon();
    }
    
    return Leaflet.divIcon({
      html: m.icon.svg,
      className: "",
      iconSize: [m.icon.width, m.icon.height],
      iconAnchor: [m.icon.x, m.icon.y],
    });
  }

  private buildSimpleMarkerIcon() {
    return Leaflet.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: './assets/icons/leaflet/marker-icon.png',
      iconRetinaUrl: './assets/icons/leaflet/marker-icon-2x.png',
      shadowUrl: './assets/icons/leaflet/marker-shadow.png'
    });
  }

  private refreshMap() {
    this.refreshMapWithSelectedCategories(this.categoriesSelected);
  }

  private initCategoriesForm() {
    this.form = this.formBuilder.group({
      categoriesForm: this.formBuilder.array([]),
    });

    this.categoriesForm.clear();
    this.categories.forEach(() => this.categoriesForm.push(new FormControl(false)));
  }

  private translateCategories(categories: Categorie[], currentLanguage: string): Categorie[] {
    return categories.map(categorie => {
      this.findTranslation(categorie, "label", currentLanguage);
      return categorie;
    });
  }

  private translateMarkers(markers: Marker[], currentLanguage: string): Marker[] {
    return markers.map(marker => {
      this.findTranslation(marker, "title", currentLanguage);
      this.findTranslation(marker, "description", currentLanguage);
      return marker;
    });
  }

  private findTranslation(objectToTranslate: Categorie | Marker, propertyToTranslate: string, currentLanguage: string) {
    const translation =
      objectToTranslate[propertyToTranslate].find((t: Label) => t.langcode === currentLanguage) ||
      objectToTranslate[propertyToTranslate].find((t: Label) => t.langcode === this.environment.defaultLanguage) ||
      objectToTranslate[propertyToTranslate][0];

    objectToTranslate[propertyToTranslate+"_translate"] = translation?.value;
  }

  flyTo(campus: Campus){
    this.map.setView([campus.initial.lat,campus.initial.lng], this.config.minZoom > 16 ? this.config.minZoom : 16);
    if(this.config.maxBounds){
      const southWest = Leaflet.latLng(campus.southwest.lat, campus.southwest.lng);
      const northEast = Leaflet.latLng(campus.northeast.lat, campus.northeast.lng);
      const bounds = Leaflet.latLngBounds(southWest, northEast);
      this.map.setMaxBounds(bounds);
    }
  }
}
