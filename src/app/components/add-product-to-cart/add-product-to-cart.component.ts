import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItemModal } from 'src/app/models/CartItemModal';
import { IProduct } from 'src/app/models/IProduct';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-product-to-cart',
  templateUrl: './add-product-to-cart.component.html',
  styleUrls: ['./add-product-to-cart.component.scss']
})
export class AddProductToCartComponent implements OnInit {

  public name: string;
  public description: string;
  public price: number;
  public productId: number;
  public image: string;
  public amount: number;
  public totalPrice: number;

  constructor(public stateService: StateService, public cartsService: CartsService, public dialogRef: MatDialogRef<AddProductToCartComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    name: string,
    description: string,
    price: number,
    productId: number,
    image: string,
    amount: number,
    toalPrice: number
  }) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.productId = data.productId;
    this.image = data.image;
    this.amount = data.amount;
    this.totalPrice = this.price;
  }

  ngOnInit(): void {
  }

  onCloseClicked() {
    this.dialogRef.close()
  }

  onPlusClicked() {
    this.amount += 1;
    this.totalPrice += this.price;

  }

  onMinusClicked() {
    if (this.amount == 1) {
      return;
    }
    this.amount -= 1;
    this.totalPrice -= this.price;
  }

  async onAddClicked() {
    for (let index = 0; index < this.stateService.cart.length; index++) {
      if (this.stateService.cart[index].productId == this.productId) {
        this.stateService.isItemInCart = true;
        this.stateService.totalPrice += this.totalPrice
        let productData = {
          productId: this.productId,
          amount: this.stateService.cart[index].amount += this.amount,
          totalPrice: this.stateService.cart[index].totalPrice += this.totalPrice
        }

        const observable = this.cartsService.updateProductToCart(productData);
        observable.subscribe(product => {
          this.dialogRef.close();
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
        totalPrice: this.price * this.amount,
      }

      this.stateService.totalPrice += this.price * this.amount

      const observable = this.cartsService.addProductToCart(productData);

      observable.subscribe(product => {
        this.dialogRef.close();
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      })
      this.stateService.cart.push({
        amount: this.amount,
        price: this.price,
        productId: this.productId,
        image: this.image,
        productName: this.name,
        description: this.description,
        totalPrice: this.price * this.amount
      });
    }
    if (this.stateService.isEmptyCart) {
      this.stateService.isEmptyCart = false;
    }

    this.stateService.isItemInCart = false;
    this.amount = null;
  }

}
