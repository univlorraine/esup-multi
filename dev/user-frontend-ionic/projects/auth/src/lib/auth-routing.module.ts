import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { ConnectedPage } from './connected/connected.page';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'connected',
        component: ConnectedPage,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: '',
        redirectTo: 'connected',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
