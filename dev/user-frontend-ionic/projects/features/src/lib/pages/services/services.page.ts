import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {
  FeaturesService, featuresUserOrder$, MenuService, ServiceMenuItem, setFeaturesUserOrder,
  TranslatedFeature, updateFeaturesListIsNewToFalse, userIsAuthenticated$
} from '@ul/shared';
import { DragulaService } from 'ng2-dragula';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { concatMap, first, map, switchMap, tap } from 'rxjs/operators';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit, OnDestroy {

  @ViewChild('servicesContainer', { read: ElementRef }) servicesContainer: ElementRef;
  @ViewChildren('draggableServices') draggableServices: QueryList<ElementRef>;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  public featuresIsEmpty$: Observable<boolean>;
  public menuItems$: Observable<ServiceMenuItem[]>;
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');
  public draggableIsOn = false;
  public menuItems: ServiceMenuItem[] = [];
  public dragIsAllowed = false;
  private subscriptions: Subscription[] = [];
  private activateDragTimeOut: number;
  private dragulaSubscriptions: Subscription[] = [];
  private onPressBound = this.onPress.bind(this);
  private onUpBound = this.onUp.bind(this);

  constructor(
    private featuresService: FeaturesService,
    private menuService: MenuService,
    private dragulaService: DragulaService,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.initMenuItems();
    this.initDragula();

    this.subscriptions.push(userIsAuthenticated$.subscribe(userIsAuthenticated => {
      this.dragIsAllowed = userIsAuthenticated;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.dragulaSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  handleChange(event) {
    this.searchQuery$.next(event.target.value);
  }

  deactivateDrag() {
    const dragIconRows = document.querySelectorAll('.drag-icon-row');
    dragIconRows.forEach((dragIconRow) => {
      dragIconRow.removeEventListener('mousedown', () => this.activateIonContentScroll());
      dragIconRow.removeEventListener('touchend', () => this.activateIonContentScroll());
    });

    Array.from(this.servicesContainer.nativeElement.children).forEach((child: any) => {
      child.classList.add('not-draggable');
    });

    this.draggableIsOn = false;
    this.servicesContainer.nativeElement.setAttribute('data-dragula', 'disabled');

    updateFeaturesListIsNewToFalse();
  }

  private initMenuItems() {
    const translatedServices$ = this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => !feature.widget && feature.menu === 'service'))
    );
    this.featuresIsEmpty$ = translatedServices$.pipe(map(features => features.length === 0));

    this.menuItems$ = combineLatest([translatedServices$, this.searchQuery$])
      .pipe(
        // Filter feature by searchQuery
        map(([features, searchQuery]) => ({
          features: this.servicesService.searchQueryFilter(features, searchQuery),
          searchQuery,
        })),
        // Sort feature with featureUserOrder
        switchMap(({ features }) => featuresUserOrder$.pipe(
          first(),
          map(userOrder => {
            //  Sort feature with IsNews first
            if (!userOrder || userOrder.length === 0) {
              const sortedFeatures = this.servicesService.sortFeaturesWithIsNewsFirst(features);
              return sortedFeatures;
            }
            // Else : sort feature with isNew First and by user order
            else {
              const sortedFeatures = this.servicesService.sortFeaturesByUserOrder(features, userOrder);
              return sortedFeatures;
            }
          }))),
        // convert sortedTranslatedFeatures into MenuItems
        map((sortedTranslatedFeatures: TranslatedFeature[]) =>
          sortedTranslatedFeatures.map(translatedFeature => this.menuService.convertTranslatedFeature(translatedFeature))
        ),
        // update the list of menu items and place listeners on them
        tap(menuItems => {
          this.menuItems = menuItems;
          setTimeout(() => {
            if (this.draggableServices) {
              this.initDraggableItemsListener();
            }
          }, 0);
        })
      );
  }

  private initDragula() {
    this.dragulaSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.dragulaService.destroy('SERVICES');
    this.dragulaService.createGroup('SERVICES', {
      moves: (el, container, handle) =>
        // Allow drag and drop on tags with dragHandle attribute (ion-button only)
        // && if not contain "not-draggable" (when drag and drop is disable)
        handle.hasAttribute('dragHandle') && !el.classList.contains('not-draggable')
    });

    this.dragulaSubscriptions.push(
      this.dragulaService.dropModel('SERVICES')
        .pipe(
          concatMap(dragulaAfterDragResponse => featuresUserOrder$.pipe(
            first(),
            map(featuresUserOrder => [dragulaAfterDragResponse.sourceModel, featuresUserOrder])))
        ).subscribe(([dragulaDomAfterDrag, featuresUserOrder]) => {
          const userOrderFeature = dragulaDomAfterDrag.map(elem => elem.id);

          setFeaturesUserOrder(userOrderFeature);
        }));
  }


  private initDraggableItemsListener() {
    this.draggableServices.forEach(item => {
      item.nativeElement.removeEventListener('mousedown', this.onPressBound);
      item.nativeElement.removeEventListener('touchstart', this.onPressBound);
      item.nativeElement.addEventListener('mousedown', (event) => this.onPress(event));
      item.nativeElement.addEventListener('touchstart', (event) => this.onPress(event));
    });

    document.removeEventListener('mouseup', this.onUpBound);
    document.removeEventListener('touchend', this.onUpBound);
    document.addEventListener('mouseup', this.onUpBound);
    document.addEventListener('touchend', this.onUpBound);
  }

  private onPress(event) {
    if (this.dragIsAllowed && !this.draggableIsOn && this.searchQuery$.getValue().length === 0) {
      this.activateDragTimeOut = window.setTimeout(() => {
        this.activateDrag();
      }, 1100);
    }
  }

  private onUp(event) {
    if (!this.draggableIsOn) {
      clearTimeout(this.activateDragTimeOut);
    }
  }

  private activateDrag() {
    this.draggableIsOn = true;

    setTimeout(() => {
      const dragIconRows = document.querySelectorAll('.drag-icon-row');

      dragIconRows.forEach((dragIconRow) => {

        dragIconRow.addEventListener('mousedown', () => this.activateIonContentScroll());
        dragIconRow.addEventListener('touchstart', () => this.activateIonContentScroll());


        dragIconRow.addEventListener('mouseup', () => this.desactivateIonContentScroll());
        dragIconRow.addEventListener('touchend', () => this.desactivateIonContentScroll());
      });
    }, 300);

    Array.from(this.servicesContainer.nativeElement.children).forEach((child: any) => {
      child.classList.remove('not-draggable');
    });

    this.servicesContainer.nativeElement.setAttribute('data-dragula', 'enabled');
  }

  private activateIonContentScroll() {
    const contentElement = document.getElementById('scrollContent');
    contentElement.classList.add('no-scroll');
  }

  private desactivateIonContentScroll() {
    const contentElement = document.getElementById('scrollContent');
    contentElement.classList.remove('no-scroll');
  }
}
