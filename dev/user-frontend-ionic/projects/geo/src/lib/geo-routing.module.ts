import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoPage } from './geo.page';

const routes: Routes = [
  {
    path: '',
    component: GeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoPageRoutingModule {}
