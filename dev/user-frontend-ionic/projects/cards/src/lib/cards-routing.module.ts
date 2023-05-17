import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsPage } from './cards.page';


const routes: Routes = [
  {
    path: 'cards',
    children: [
      {
        path: '',
        component: CardsPage,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsRoutingModule { }
