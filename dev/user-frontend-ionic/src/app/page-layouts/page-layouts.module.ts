import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsLayoutPage } from './tabs-layout/tabs-layout.page';
import { FullLayoutPage } from './full-layout/full-layout.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
  ],
  declarations: [
    TabsLayoutPage,
    FullLayoutPage,
  ],
  exports: [
    TabsLayoutPage,
    FullLayoutPage,
  ],
})
export class PageLayoutsModule {}
