import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductResolver } from './services/product.resolver';
import { BasketComponent } from './components/basket/basket.component';
import { MainComponent } from './components/main/main.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent, resolve: { data: ProductResolver } },
  { path: 'basket', component: BasketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
