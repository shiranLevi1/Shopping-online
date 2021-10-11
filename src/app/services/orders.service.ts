import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  
  public newOrder(orderData: OrderDetails): Observable<OrderDetails> {

    return this.http.post<OrderDetails>("http://localhost:3001/orders/newOrder", orderData);
  }
  
  public getUserOrders(): Observable<any> {

    return this.http.get<any>("http://localhost:3001/orders/getUserOrders");
  }
  
  public getNumberOfOrders(): Observable<any> {

    return this.http.get<any>("http://localhost:3001/orders/numberOfOrders");
  }
  
  public getOrderDetails(): Observable<OrderDetails> {

    return this.http.get<OrderDetails>("http://localhost:3001/orders/orderDetails");
  }
  
  public isAbleShippingDate(shippingOrderData: any): Observable<any> {
    
    return this.http.post<any>("http://localhost:3001/orders/isAbleShippingDate", {shippingOrderData});
  }
}
