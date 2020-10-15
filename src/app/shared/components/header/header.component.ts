import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public total = 0;
  constructor(private router: Router, private gs: GlobalService) { }

  ngOnInit(): void {
    this.router.events.subscribe(change => {
      this.checkCart()
    })
    console.log(this.gs.items)
    this.gs.cartUpdated.subscribe(data => {
      this.checkCart()
    })
  }


  checkCart() {
    let cart = this.gs.getLocalStorage('cart')
    if (cart) {
      this.total = this.gs.getLocalStorage('cart').length
    }else{
      this.total=0;
    }
  }

  navigate(route?) {
    if (route) {
      this.gs.navigate(route)
    } else {
      this.gs.showToast('info', 'Your cart is empty')
    }

  }


  



}
