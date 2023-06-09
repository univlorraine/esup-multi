import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Network } from '@capacitor/network';
import { Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import Swiper from 'swiper';
import { getRestaurantById, Restaurant } from '../restaurants.repository';
import { getMenusByRestaurantId, Menu } from './menus.repository';
import { RestaurantMenusService } from './restaurant-menus.service';

@Component({
  selector: 'app-restaurant-menus',
  templateUrl: './restaurant-menus.page.html',
  styleUrls: ['./restaurant-menus.page.scss'],
})
export class RestaurantMenusPage implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer: ElementRef;

  public restaurantMenusIsEmpty$: Observable<boolean>;
  public restaurant$: Observable<Restaurant>;
  public menus$: Observable<Menu[]>;
  public isLoading = false;
  private swiper: Swiper;
  private restaurantId: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantMenusService: RestaurantMenusService
  ) { }

  async ngOnInit() {

    this.restaurantId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.restaurant$ = getRestaurantById(this.restaurantId);
    this.menus$ = getMenusByRestaurantId(this.restaurantId);
    this.restaurantMenusIsEmpty$ = this.menus$.pipe(
      map(menus => menus?.length === 0)
    );

    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;

    // @TODO à décommenter une fois l'api de l'ul en place
    // const currentDate = new Date().toISOString().slice(0, 10);

    // @TODO à décommenter une fois l'api de l'ul en place
    // return this.restaurantsService.loadAndStoreRestaurantMenus(restaurantId, currentDate)...
    this.restaurantMenusService.loadAndStoreMenus(this.restaurantId).pipe(
      first(),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();

  }

  ngAfterViewInit() {
    const swiperContainer: HTMLElement = this.swiperContainer.nativeElement;
    this.swiper = new Swiper(swiperContainer, {
      // options du swiper
    });
  }
}
