import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  public getAllProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>("http://localhost:3001/products/");
  }

  public addProduct(productData: IProduct): Observable<IProduct> {

    return this.http.post<IProduct>("http://localhost:3001/products/", productData);
  }

  public uploadImage(file: FormData): Observable<any> {

    return this.http.post<any>("http://localhost:3001/products/uploadImage", file);
  }

  public updateProduct(productData: IProduct): Observable<IProduct> {

    return this.http.put<IProduct>("http://localhost:3001/products/", productData);
  }

}
