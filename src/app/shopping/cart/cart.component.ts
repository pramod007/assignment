import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public items = []

  constructor(public gs: GlobalService) { }

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    let cart = this.gs.getCart()
    if (cart && cart.length) {
      this.items = cart
    }
  }

  remove(item, i) {

    if (confirm('DOo you want to remove item?')){
      let cart = this.gs.getCart()
      item.qunatity = item.qunatity - 1;
      if (item.qunatity) {
        cart[i] = item;
      } else {
        this.items.splice(i, 1)
        cart.splice(i, 1)
      }
      this.gs.setLocalStorage('cart', cart)
    }
    
  }

  navigate(id) {
    this.gs.navigate('store/' + id)
  }


  save(code) {
    let req = {
      code: code,
      status: true
    }
    this.gs.setLocalStorage('coupon', req)
    this.gs.showToast('success', 'Coupon Applied')
  }


  applyCoupon() {
    let req = {
      code: 'SUMMERSALE10',
      status: true
    }
    this.gs.setLocalStorage('coupon', req)
    this.gs.checkDiscountCode()
    this.gs.showToast('success', 'Coupon Applied')
    this.totolAmount(this.items)
  }


  removeCoupon() {
    this.gs.deleteLocalStorage('coupon')
    this.gs.checkDiscountCode()
  }


  totolAmount(item) {
    let total = 0;
    for (let i = 0; i < item.length; i++) {
      total = total + (item[i].price * item[i].qunatity)
    }
    return total
  }

  navigateToStore() {
    this.gs.navigate('store')
  }

  checkOut() {
    if (confirm('Do you want checkout ? ')) {
      this.gs.deleteLocalStorage('cart')
      this.gs.showToast('success', 'Thank you for shopping')
      this.gs.cartUpdated.next('updated')
      this.gs.navigate('store')
    }

  }


}
