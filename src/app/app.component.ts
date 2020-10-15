import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pramod';

  constructor(public gs: GlobalService,public router:Router) {
 
    this.router.events.subscribe(data => {
      this.gs.checkDiscountCode()
    })
  }



}
