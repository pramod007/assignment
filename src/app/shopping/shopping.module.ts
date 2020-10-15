import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ShoppingComponent } from './shopping.component';
import { CouponComponent } from './coupon/coupon.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [LandingPageComponent, ShoppingComponent, CouponComponent, DetailsComponent, CartComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ShoppingModule { }
