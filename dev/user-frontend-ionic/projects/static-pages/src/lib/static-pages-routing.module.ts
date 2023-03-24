import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticPageComponent } from './static-page/static-page.component';

const routes: Routes = [
  { path: 'page/:id', component: StaticPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticPagesRoutingModule {}
