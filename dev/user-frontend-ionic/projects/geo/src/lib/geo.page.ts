import { Component, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {


  public coordinates = new Subject<Position>();

  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.coordinates.next(await Geolocation.getCurrentPosition());
  };

}
