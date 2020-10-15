import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public params: any
  public item: any

  constructor(private ar: ActivatedRoute, public gs: GlobalService, public router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.params = params;
      this.getDetails(params.id)
    })
  }

  getDetails(id) {
    this.item = this.gs.items.find((data) => data.id == id)
    this.checkQuantityInCart()
    this.isInWishlist()
  }


  navigate(id) {
    this.gs.navigate('store/' + id)
    this.gs.topFunction()
  }

  changeImage(i) {
    document.getElementById('im').setAttribute('src', i)
  }

  addToCart() {
    try {
      let cart = this.gs.getLocalStorage('cart')
      let check = this.isExist(cart)
      if (cart && cart.length) {
        if (check.exist) {
          cart[check.index].qunatity = cart[check.index].qunatity ? (cart[check.index].qunatity + 1) : 2;
          this.gs.showToast('success', 'Already Exists Quntaity incresed', 'Cart')
        } else {
          this.item.qunatity = 1;
          cart.push(this.item)
        }
      } else {
        this.item.qunatity = 1;
        cart = [this.item]
      }

      this.gs.setLocalStorage('cart', cart)
      this.gs.showToast('success', 'Added in cart', 'CART')
      this.checkQuantityInCart()
      this.gs.cartUpdated.next('updated')
    } catch (error) {
      this.gs.showToast()
    }
  }


  aadToWishlist() {
    try {
      let wish = this.gs.getLocalStorage('wishlist')
      if (wish && wish.length) {
        this.item.wish = true;
        wish.push(this.item)
      } else {
        this.item.wish = true;
        wish = [this.item]
      }
      this.gs.setLocalStorage('wishlist', wish)
      this.gs.showToast('success', 'Added in Wishlist', 'Wishlist')
      this.isInWishlist()
      this.gs.cartUpdated.next('updated')
    } catch (error) {
      this.gs.showToast()
    }
  }

  isExist(cart) {
    try {
      if (!cart) {
        return
      }
      let index = cart.findIndex(data => data.id == this.item.id)
      let ret = { exist: (index > -1 ? true : false), index: index }
      return ret;
    } catch (error) {
      this.gs.showToast()
    }
  }

  checkQuantityInCart() {
    try {
      let cart = this.gs.getCart();
      let check = this.isExist(cart)
      this.item = check.exist ? cart[check.index] : this.item
    } catch (error) {
      this.gs.showToast()
    }
  }

  isInWishlist() {
    try {
      let cart = this.gs.getWishList();
      if (cart)
        this.item.wish = this.isExist(cart).exist ? true : false
    } catch (error) {
      this.gs.showToast()
    }
  }


  removeFromWishlist() {
    try {
      let cart = this.gs.getWishList();
      let check = this.isExist(cart)
      if (check.exist) {
        this.item.wish = false;
        cart.splice(check.index, 1)
        this.gs.setLocalStorage('wishlist', cart)
        this.gs.showToast('success', 'Removed from Wishlist')
      }
    } catch (error) {
      this.gs.showToast()
      this.item.wish = false
    }
  }


}
