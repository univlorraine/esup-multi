import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@ul/auth';
import { InfoPageModule } from '@ul/info';


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
    path: InfoPageModule.PATH,
    loadChildren: () => import('@ul/info').then( m => m.InfoPageModule)
  },
  {
    path: AuthModule.PATH,
    loadChildren: () => import('@ul/auth').then( m => m.AuthModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
