import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CouponComponent } from './coupon/coupon.component';
import { DetailsComponent } from './details/details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ShoppingComponent } from './shopping.component';


const routes: Routes = [

  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: 'coupon',
        component: CouponComponent
      },
      {
        path: 'store',
        component: LandingPageComponent
      },
      {
        path: 'store/:id',
        component: DetailsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
