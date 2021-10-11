import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { AddProductToCartComponent } from '../add-product-to-cart/add-product-to-cart.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @ViewChild("fileUpload", { static: false })
  public fileUpload: ElementRef;
  public formData = new FormData();

  public isImageChanged: boolean = false;
  public priceError: string;
  public productNameError: string;
  public descriptionError: string;
  public imageError: string;
  public error: boolean = false;

  public categoryName: string;

  public productData: IProduct = {
    categoryId: null,
    price: null,
    image: null,
    productName: null,
    description: null,
    productId: null
  }

  constructor(public stateService: StateService, private productsService: ProductsService, public dialogRef: MatDialogRef<AddProductToCartComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    name: string,
    description: string,
    price: number,
    productId: number,
    image: string,
    amount: number,
    totalPrice: number,
    categoryId: number
    categoryName: string
  }) {
    this.productData.name = data.name;
    this.productData.description = data.description;
    this.productData.price = data.price;
    this.productData.productId = data.productId;
    this.productData.image = data.image;
    this.productData.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
  }

  ngOnInit(): void {
  }

  onCategoryOptionSelected(event: any) {
    this.productData.categoryId = event.target.value;
  }

  onSaveChangesClicked() {

    this.validateInputs(this.productData.name, this.productData.price, this.productData.description);

    if (!this.error) {
      if (this.isImageChanged) {

      }
      const observable = this.productsService.updateProduct(this.productData);

      observable.subscribe(update => {
        this.dialogRef.close();
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      })

      this.getAllProduct();
    }
  }

  getAllProduct() {
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

  onFileClicked() {
    let fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.uploadFile(file);
    }

    fileUpload.click();
  };

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.productsService.uploadImage(formData).subscribe((event: any) => {
      this.productData.image = event;
    });
  }

  validateInputs(name: string, price: number, description: string) {
    if (!name) {
      this.error = true;
      this.productNameError = "* You can not provide an empty field";
    }
    else if (!price) {
      this.error = true;
      this.priceError = "* You can not provide an empty field";
    }
    else if (!description) {
      this.error = true;
      this.descriptionError = "* You can not provide an empty field";
    }
    else {
      this.clearErrors();
    }
  }

  clearErrors() {
    this.productNameError = "";
    this.descriptionError = "";
    this.priceError = "";
    this.error = false;
  }

}