import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { IProducts } from './../../models/products';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: IProducts
  productSubscription!: Subscription

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data']
    })
  }
}
