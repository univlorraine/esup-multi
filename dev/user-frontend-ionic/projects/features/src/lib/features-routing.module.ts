import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesPage } from './pages/services/services.page';
import { WidgetsPage } from './pages/widgets/widgets.page';

const routes: Routes = [
  {
    path: 'features/services',
    component: ServicesPage
  },
  {
    path: 'features/widgets',
    component: WidgetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
