import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HelloPageModule } from '@ul/hello';
import { GeoPageModule } from '@ul/geo';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: HelloPageModule.PATH,
    loadChildren: () => import('@ul/hello').then( m => m.HelloPageModule)
  },
  {
    path: GeoPageModule.PATH,
    loadChildren: () => import('@ul/geo').then( m => m.GeoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
