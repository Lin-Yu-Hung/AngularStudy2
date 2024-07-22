import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
];
