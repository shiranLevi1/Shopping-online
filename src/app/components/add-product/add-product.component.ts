import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  @Output() greetEvent = new EventEmitter();
  @ViewChild("fileUpload", { static: false })
  public fileUpload: ElementRef;
  public formData = new FormData();
  public fileName: string;

  public productData: IProduct = {}
  public isAddClicked: boolean = false;
  public productNameError: string;
  public descriptionError: string;
  public priceError: string;
  public imageError: string;
  public categoryError: string;

  public error: boolean = false;
  public isAddProductSucceed: boolean = true;

  constructor(public stateService: StateService, private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.stateService.isAdmin = true;
  }

  onCategoryOptionSelected(event: any) {
    this.productData.categoryId = event.target.value;
  }

  onAddProductClicked() {
    this.validateInputs(this.productData.name, this.productData.description, this.productData.price, this.productData.categoryId, this.productData.image);

    if (!this.error) {
      const observable = this.productsService.addProduct(this.productData);

      observable.subscribe(update => {
        this.stateService.products.push()
        this.isAddClicked = false;
        this.productData = {};
        this.greetEvent.emit(this.isAddProductSucceed);
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
      this.fileName = file.name;
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

  validateInputs(name: string, description: string, price: number, category: number, image: any) {
    if (!name) {
      this.productNameError = "* You can not provide an empty field";
      this.error = true;
    }
    else if (!price) {
      this.priceError = "* You can not provide an empty field";
      this.error = true;
    }
    else if (!description) {
      this.descriptionError = "* You can not provide an empty field";
      this.error = true;
    }
    else if (!category) {
      this.categoryError = "* You can not provide an empty field";
      this.error = true;
    }
    else if (!image) {
      this.imageError = "* Please select image";
      this.error = true;
    }
    else {
      this.clearErrors();
    }
  }

  clearErrors() {
    this.productNameError = "";
    this.priceError = "";
    this.descriptionError = "";
    this.imageError = "";
    this.categoryError = "";
    this.error = false;
  }

  onAddClicked() {
    if (this.isAddClicked) {
      this.isAddClicked = false;
      return;
    }

    this.isAddClicked = true;
  }

}
