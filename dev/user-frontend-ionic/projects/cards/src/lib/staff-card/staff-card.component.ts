import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-staff-card',
  templateUrl: './svg_cart_pro.html',
})
export class StaffCardComponent{

  @Input() userAndCardsData;

  constructor() {}

}
