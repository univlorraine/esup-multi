import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RssPage } from './rss.page';

const routes: Routes = [
  {
    path: 'rss',
    component: RssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RssPageRoutingModule {}
