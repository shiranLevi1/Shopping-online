import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: '0%' }),
        animate('200ms ease-in', style({ opacity: '100%' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: '0%' })),
      ]),
    ]),
  ],
})
export class AdminComponent implements OnInit {
  public isAddProductSucceed: boolean;

  constructor(private productsService: ProductsService, public stateService: StateService, private cartsService: CartsService) { }

  ngOnInit(): void {
    this.stateService.categoryId = null;
    this.stateService.isAdmin = true;

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
  }

  addProductSucceed(event: boolean) {
    this.isAddProductSucceed = event;
    setTimeout(() => {
      this.isAddProductSucceed = false;
    }, 2000);
  }

}
