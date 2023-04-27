import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  landingImgUrl = 'assets/img/house_res.jpg';

  constructor() {
    localStorage.clear();
  }
}
