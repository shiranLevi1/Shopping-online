import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
})
export class MiniCartComponent implements OnInit {
  @Output() viewCartClicked = new EventEmitter();

  constructor(public stateService: StateService, private router: Router, private cartsService: CartsService) { }

  ngOnInit(): void {

  }

  onToCartClicked() {
    this.viewCartClicked.emit()
    this.router.navigate(["cart"])
  }

  onRemoveItemClicked(productId: number) {
    const observable = this.cartsService.removeItemFromCart(productId);

    observable.subscribe(removeItemFromCart => {
      let index = this.getRemovedItemIndexAndPrice(productId);
      this.stateService.cart.splice(index.index, 1);
      this.stateService.totalPrice -= index.price;

      if (this.stateService.cart.length == 0) {
        this.stateService.isEmptyCart = true;
        this.viewCartClicked.emit();
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

    this.viewCartClicked.emit();
  }

}
