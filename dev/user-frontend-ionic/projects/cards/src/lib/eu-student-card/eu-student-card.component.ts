import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eu-student-card',
  templateUrl: './svg_cart_europ.html',
})
export class EuStudentCardComponent{

  @Input() userAndCardsData;

  constructor() {}

}
