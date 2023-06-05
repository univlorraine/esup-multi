import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantMenusPage } from './restaurant-menus-page/restaurant-menus.page';
import { RestaurantsPage } from './restaurants.page';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantsPage
  },
  {
    path: 'restaurants/:id/menu',
    component: RestaurantMenusPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
