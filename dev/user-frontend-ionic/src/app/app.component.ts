import {Component, Inject, OnInit} from '@angular/core';
import { ProjectModuleService } from '@ul/shared';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuItems;
  public languages: Array<string> = [];

  constructor(
    @Inject('environment')
    private environment: any,
    private projectModuleService: ProjectModuleService,
    private translateService: TranslateService
  ) {
    // Define available languages in app
    this.languages = this.environment.languages;
    this.translateService.addLangs(this.languages);
  }

  ngOnInit() {
    this.menuItems = this.projectModuleService.getMenuItems();
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }
}
