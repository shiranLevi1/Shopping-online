import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemModal } from '../models/CartItemModal';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  public addProductToCart(productData: any): Observable<any> {

    return this.http.post<any>("http://localhost:3001/carts/", productData);
  }
  
  public getUserCart(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>("http://localhost:3001/carts/");
  }
  
  public updateProductToCart(productData: CartItemModal): Observable<CartItemModal> {

    return this.http.put<CartItemModal>("http://localhost:3001/carts/", productData);
  }
  
    public clearCart(): Observable<any> {
  
      return this.http.delete<any>("http://localhost:3001/carts/");
    }

  public openNewCart(): Observable<any> {

    return this.http.delete<any>("http://localhost:3001/carts/openNewCart");
  }
  
  public removeItemFromCart(productId: number): Observable<number> {

    return this.http.delete<number>(`http://localhost:3001/carts/${productId}`);
  }
}
