import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TilesPage } from './tiles.page';

const routes: Routes = [
  {
    path: 'tiles',
    component: TilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TilesRoutingModule {}
