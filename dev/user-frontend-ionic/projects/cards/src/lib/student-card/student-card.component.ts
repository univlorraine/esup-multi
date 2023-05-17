import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './svg_cart_etu.html',
})
export class StudentCardComponent{
  @Input() userAndCardsData;

  constructor() {}
}
