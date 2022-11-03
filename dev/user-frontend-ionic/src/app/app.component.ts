import { Component, OnInit } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuItems;

  constructor(private projectModuleService: ProjectModuleService) {}

  ngOnInit() {
    this.menuItems = this.projectModuleService.getMenuItems();
  }
}
