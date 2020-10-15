import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import items from '../app/shared/items'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public items = items;
  public cartUpdated = new Subject();
  constructor(public router: Router, public toaster: ToastrService) {
  }
  setLocalStorage(name, req) {
    try {
      localStorage.setItem(name, JSON.stringify(req))
    } catch (error) {
      console.log(error)
    }
  }

  getLocalStorage(name) {
    try {
      let obj = localStorage.getItem(name);
      return JSON.parse(obj)
    } catch (error) {
      console.log(error)
    }
  }

  deleteLocalStorage(name) {
    localStorage.removeItem(name)
  }

  removeEntity(name, index) {
    let items: any = this.getLocalStorage(name);
    items.splice(index, 1)
    this.setLocalStorage(name, items)
  }

  navigate(route) {
    this.router.navigate([route]);
  }

  showToast(type?, msg?, name?) {
    // success/error/warning/info/show()
    if (msg) {
      this.toaster.success(msg, name)
    } else {
      this.toaster.error('Something went Wrong')
    }
  }

  getCart() {
    return this.getLocalStorage('cart')
  }


  getWishList() {
    return this.getLocalStorage('wishlist')
  }

  discountedPrice(price) {
    let coupon = this.getLocalStorage('coupon')
    if (coupon && coupon.status) {
      console.log()
      let p = price - (price / 10)
      return p
    } else {
      return price
    }
  }

  isDiscountApplicable = false;
  checkDiscountCode() {
    let t = 10
    let p = this.discountedPrice(10)
    this.isDiscountApplicable = t == p ? false : true
  }


   topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
