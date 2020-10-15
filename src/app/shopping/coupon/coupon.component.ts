import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  constructor(private gs: GlobalService) { }

  ngOnInit(): void {
  }


  close() {
    this.gs.navigate('store')
  }

  save(code) {
    let req = {
      code: code,
      status: true
    }
    this.gs.setLocalStorage('coupon', req)
    this.gs.showToast('success', 'Coupon Saved')
    this.gs.navigate('store')
  }
}
