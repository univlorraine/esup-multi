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

import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {
  FeaturesService, featuresUserOrder$, MenuService, ServiceMenuItem, setFeaturesUserOrder,
  TranslatedFeature, updateFeaturesListIsNewToFalse, userIsAuthenticated$
} from '@ul/shared';
import { DragulaService } from 'ng2-dragula';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { concatMap, map, switchMap, take, tap } from 'rxjs/operators';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['../../../../../../src/theme/app-theme/features/services.page.scss'],
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
  private onVisibilityChangeBound = this.onVisibilityChange.bind(this);

  constructor(
    private featuresService: FeaturesService,
    private menuService: MenuService,
    private dragulaService: DragulaService,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    document.addEventListener('visibilitychange', (event) => this.onVisibilityChange(event));

    this.initMenuItems();
    this.initDragula();

    this.subscriptions.push(userIsAuthenticated$.subscribe(userIsAuthenticated => {
      this.dragIsAllowed = userIsAuthenticated;
    }));
  }

  ngOnDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChangeBound);
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.dragulaSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onVisibilityChange(event) {
    clearTimeout(this.activateDragTimeOut);
  }

  handleChange(event) {
    this.searchQuery$.next(event.target.value);
  }

  deactivateDrag() {
    const dragButtons = document.querySelectorAll('.drag-button');
    dragButtons.forEach((dragButton) => {
      dragButton.removeEventListener('mousedown', () => this.activateIonContentScroll());
      dragButton.removeEventListener('touchend', () => this.activateIonContentScroll());
    });

    Array.from(this.servicesContainer.nativeElement.children).forEach((child: any) => {
      child.classList.add('not-draggable');
    });

    this.draggableIsOn = false;
    this.servicesContainer.nativeElement.setAttribute('data-dragula', 'disabled');

    updateFeaturesListIsNewToFalse();
  }

  handleScrollStart() {
    clearTimeout(this.activateDragTimeOut);
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
          take(1),
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
        // && if not contain "not-draggable" (when drag and drop is disabled)
        handle.hasAttribute('dragHandle') && !el.classList.contains('not-draggable')
    });

    this.dragulaSubscriptions.push(
      this.dragulaService.dropModel('SERVICES')
        .pipe(
          concatMap(dragulaAfterDragResponse => featuresUserOrder$.pipe(
            take(1),
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
      clearTimeout(this.activateDragTimeOut);
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

    window.setTimeout(() => {
      const dragButtons = document.querySelectorAll('.drag-button');

      dragButtons.forEach((dragButton) => {

        dragButton.addEventListener('mousedown', () => this.activateIonContentScroll());
        dragButton.addEventListener('touchstart', () => this.activateIonContentScroll());


        dragButton.addEventListener('mouseup', () => this.desactivateIonContentScroll());
        dragButton.addEventListener('touchend', () => this.desactivateIonContentScroll());
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
