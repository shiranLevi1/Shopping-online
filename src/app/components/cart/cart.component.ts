import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public stateService: StateService, private cartsService: CartsService, private router: Router) { }
  public searchValue: string;
  
  ngOnInit(): void {
  }

  onRemoveItemClicked(productId: number) {
    const observable = this.cartsService.removeItemFromCart(productId);

    observable.subscribe(removeItemFromCart => {
      let index = this.getRemovedItemIndexAndPrice(productId);
      this.stateService.cart.splice(index.index, 1);
      this.stateService.totalPrice -= index.price;

      if (this.stateService.cart.length == 0) {
        this.stateService.isEmptyCart = true;
      }
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  private getRemovedItemIndexAndPrice(productId: number): any {
    for (let index = 0; index < this.stateService.cart.length; index++) {
      if (this.stateService.cart[index].productId == productId) {
        let price: number = this.stateService.cart[index].totalPrice
        return { index, price };
      }
    }

    return -1;
  }

  onPlusClicked(productId: number, productPrice: number) {
    for (let index = 0; index < this.stateService.cart.length; index++) {
      if (this.stateService.cart[index].productId == productId) {

        let productData = {
          productId: productId,
          amount: this.stateService.cart[index].amount += 1,
          totalPrice: this.stateService.cart[index].totalPrice += productPrice
        }

        const observable = this.cartsService.updateProductToCart(productData);
        observable.subscribe(product => {
          this.stateService.totalPrice += productPrice;
          return;
        }, serverErrorResponse => {
          console.log("Error! " + serverErrorResponse.message);
          alert("Error! " + serverErrorResponse.message)
        })
      }
    }
  }

  onMinusClicked(productId: number, productPrice: number) {
    for (let index = 0; index < this.stateService.cart.length; index++) {
      if (this.stateService.cart[index].productId == productId) {
        let productData = {
          productId: productId,
          amount: this.stateService.cart[index].amount -= 1,
          totalPrice: this.stateService.cart[index].totalPrice -= productPrice
        }

        if (productData.amount == 0) {
          this.onRemoveItemClicked(productId);
          this.stateService.totalPrice -= productPrice;
          return;
        }

        const observable = this.cartsService.updateProductToCart(productData);
        observable.subscribe(product => {
          this.stateService.totalPrice -= productPrice;
          return;
        }, serverErrorResponse => {
          console.log("Error! " + serverErrorResponse.message);
          alert("Error! " + serverErrorResponse.message)
        })
      }
    }
  }

  onOrderNowClicked() {
    this.router.navigate(["order"])
  }

  onContinueShoppingClicked() {
    this.router.navigate([""])
  }

  onClearCartClicked() {
    const observable = this.cartsService.clearCart();

    observable.subscribe(removeItemFromCart => {
      this.stateService.cart = [];
      this.stateService.isEmptyCart = true;
      this.stateService.totalPrice = 0;
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

}
