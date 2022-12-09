import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@ul/auth';
import { CardsPageModule } from '@ul/cards';
import { InfoPageModule } from '@ul/info';
import { MapModule } from '@ul/map';
import { PreferencesPageModule } from '@ul/preferences';
import { RssPageModule } from '@ul/rss';
import { ScheduleModule } from '@ul/schedule';





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
    path: InfoPageModule.path,
    loadChildren: () => import('@ul/info').then( m => m.InfoPageModule)
  },
  {
    path: AuthModule.path,
    loadChildren: () => import('@ul/auth').then( m => m.AuthModule)
  },
  {
    path: PreferencesPageModule.path,
    loadChildren: () => import('@ul/preferences').then( m => m.PreferencesPageModule)
  },
  {
    path: MapModule.path,
    loadChildren: () => import('@ul/map').then( m => m.MapModule)
  },
  {
    path: RssPageModule.path,
    loadChildren: () => import('@ul/rss').then( m => m.RssPageModule)
  },
  {
    path: CardsPageModule.path,
    loadChildren: () => import('@ul/cards').then( m => m.CardsPageModule)
  },
  {
    path: ScheduleModule.path,
    loadChildren: () => import('@ul/schedule').then( m => m.ScheduleModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
