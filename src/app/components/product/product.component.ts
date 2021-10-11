import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItemModal } from 'src/app/models/CartItemModal';
import { IProduct } from 'src/app/models/IProduct';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';
import { AddProductToCartComponent } from '../add-product-to-cart/add-product-to-cart.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: IProduct = {} as IProduct;

  public isAddToCartClicked: boolean = false;
  public amount: number;
  public productId: number;


  constructor(public stateService: StateService, private cartsService: CartsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  onAddToCartClicked(product: any) {
    this.productId = product.productId;
    this.dialog.open(AddProductToCartComponent, {
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        productId: product.productId,
        image: product.image,
        amount: 1
      },
    });
  }

  onCancelClicked() {
    this.isAddToCartClicked = false;
  }

  async onOkClicked(product: IProduct) {
    for (let index = 0; index < this.stateService.cart.length; index++) {
      if (this.stateService.cart[index].productId == product.productId) {
        this.stateService.isItemInCart = true;
        this.stateService.totalPrice += product.price * this.amount
        let productData = {
          productId: this.productId,
          amount: this.stateService.cart[index].amount += this.amount,
          totalPrice: this.stateService.cart[index].totalPrice += product.price * this.amount
        }

        const observable = this.cartsService.updateProductToCart(productData);
        observable.subscribe(product => {
          this.isAddToCartClicked = false;
          this.stateService.cart.length += 1;
          return;
        }, serverErrorResponse => {
          console.log("Error! " + serverErrorResponse.message);
          alert("Error! " + serverErrorResponse.message)
        })
      }
    }

    if (!this.stateService.isItemInCart) {

      let productData: CartItemModal = {
        productId: this.productId,
        amount: this.amount,
        totalPrice: product.price * this.amount,
      }

      this.stateService.totalPrice += product.price * this.amount

      const observable = this.cartsService.addProductToCart(productData);

      observable.subscribe(product => {
        this.isAddToCartClicked = false;
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      })
      this.stateService.cart.push({
        amount: this.amount,
        price: product.price,
        productId: product.productId,
        image: product.image,
        productName: product.name,
        description: product.description,
        totalPrice: product.price * this.amount
      });
    }
    if (this.stateService.isEmptyCart) {
      this.stateService.isEmptyCart = false;
    }

    this.stateService.isItemInCart = false;
    this.amount = null;
  }

  onEditClicked(product: any) {
    this.dialog.open(EditProductComponent, {
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        productId: product.productId,
        image: product.image,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
      },
    })

  }
}
