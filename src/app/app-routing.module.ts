import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'coupon',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
