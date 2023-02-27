import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { IProducts } from './../../models/products';
import { ProductsService } from './../../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: IProducts[]
  productsSubscription!: Subscription
  basket!: IProducts[]
  basketSubscription!: Subscription
  canEdit: boolean = false
  canView: boolean = false

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.canEdit = true
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => this.products = data)
    this.basketSubscription = this.productsService.getProductFromBasket().subscribe((data) => this.basket = data)
  }
  addToBasket(product: IProducts): void {
    product.quantity = 1
    let findItem

    if (this.basket.length) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(product)
    } else {
      this.postToBasket(product)
    }
  }
  postToBasket(product: IProducts) {
    this.productsService.postProductToBasket(product).subscribe(() => this.basket.push(product))
  }
  updateToBasket(product: IProducts) {
    product.quantity += 1
    this.productsService.updateProductToBasket(product).subscribe((data) => console.log(data))
  }
  deleteCard(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id)
        this.products.splice(idx, 1)
      }
    }))
  }
  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.data = product

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
          this.updateData(data)
        else
          this.postData(data)
      }
    })
  }
  postData(data: IProducts) {
    this.productsService.postProduct(data).subscribe((data) => this.products.push(data))
  }
  updateData(product: IProducts) {
    this.productsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data
        else return product
      })
    })
  }
  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

}
