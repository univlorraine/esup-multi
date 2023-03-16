import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsPage } from './notifications.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  {
    path: 'notifications',
    component: NotificationsPage
  },
  {
    path: 'notifications/settings',
    component: SettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
