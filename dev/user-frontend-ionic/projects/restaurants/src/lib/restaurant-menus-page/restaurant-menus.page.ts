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

import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '@multi/shared';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import Swiper from 'swiper';
import { getRestaurantById, Restaurant } from '../restaurants.repository';
import { getMenusByRestaurantId, Menu } from './menus.repository';
import { RestaurantMenusService } from './restaurant-menus.service';

@Component({
  selector: 'app-restaurant-menus',
  templateUrl: './restaurant-menus.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/restaurants/restaurant-menus.page.scss'],
})
export class RestaurantMenusPage implements OnInit, AfterViewChecked {
  @ViewChild('swiperContainer') swiperContainer: ElementRef;

  public restaurantMenusIsEmpty$: Observable<boolean>;
  public restaurant$: Observable<Restaurant>;
  public menus$: Observable<Menu[]>;
  public isLoading = false;
  protected swiper: Swiper;
  private restaurantId: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantMenusService: RestaurantMenusService,
    private networkService: NetworkService,
  ) { }

  ngOnInit() {
    this.restaurantId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.restaurant$ = getRestaurantById(this.restaurantId);
    this.menus$ = getMenusByRestaurantId(this.restaurantId);
    this.restaurantMenusIsEmpty$ = this.menus$.pipe(
      map(menus => menus?.length === 0)
    );

    this.loadMenusIfNetworkAvailable();
  }

  async loadMenusIfNetworkAvailable() {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.isLoading = true;

    // @TODO à décommenter une fois l'api de l'ul en place
    // const currentDate = new Date().toISOString().slice(0, 10);

    // @TODO à décommenter une fois l'api de l'ul en place
    // return this.restaurantsService.loadAndStoreRestaurantMenus(restaurantId, currentDate)...
    this.restaurantMenusService.loadAndStoreMenus(this.restaurantId).pipe(
      take(1),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  ngAfterViewChecked() {
    if (this.swiper === undefined) {
      const swiperContainer: HTMLElement = this.swiperContainer.nativeElement;
      const swiperSlides = swiperContainer.querySelectorAll('.swiper-slide');

      if (swiperSlides.length > 0) {
        this.initializeSwiper(swiperContainer);
      }
    }
  }

  initializeSwiper(swiperContainer: HTMLElement) {
    this.swiper = new Swiper(swiperContainer, {
      // Swiper options :
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const nextButton = swiperContainer.querySelector('.swiper-button-next');
    const prevButton = swiperContainer.querySelector('.swiper-button-prev');

    nextButton.addEventListener('click', () => {
      this.swiper.slideNext();
    });

    prevButton.addEventListener('click', () => {
      this.swiper.slidePrev();
    });
  }
}
