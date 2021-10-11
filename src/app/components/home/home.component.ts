import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public stateService: StateService, private cartsService: CartsService, private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.stateService.categoryId = null;

    const observable = this.productsService.getAllProducts();

    observable.subscribe(products => {
      this.stateService.products = products
      this.stateService.categories = [];
      let categoriesId: any[] = [];

      for (let index = 0; index < this.stateService.products.length; index++) {
        if (!categoriesId.includes(this.stateService.products[index].categoryId)) {
          categoriesId.push(this.stateService.products[index].categoryId)
          this.stateService.categories.push({
            categoryId: this.stateService.products[index].categoryId,
            categoryName: this.stateService.products[index].categoryName
          })
        }
      }
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    });

    if (this.stateService.isLoggedIn) {
      const observable2 = this.cartsService.getUserCart();

      observable2.subscribe(cartPruducts => {
        this.stateService.cart = cartPruducts;
        if (this.stateService.cart.length != 0) {
          this.stateService.isEmptyCart = false;
        } else {
          this.stateService.isEmptyCart = true;
        }

        cartPruducts.forEach(product => {
          this.stateService.totalPrice += product.totalPrice;
        });
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      })
    }
  }
}
