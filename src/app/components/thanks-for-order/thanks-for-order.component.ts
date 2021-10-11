import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-thanks-for-order',
  templateUrl: './thanks-for-order.component.html',
  styleUrls: ['./thanks-for-order.component.scss']
})
export class ThanksForOrderComponent implements OnInit {

  public orderDetails: OrderDetails;
  constructor(private ordersService: OrdersService, private cartsService: CartsService, private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    const observable = this.ordersService.getOrderDetails();
    const observable2 = this.cartsService.openNewCart();

    observable.subscribe(orderDetails => {
      this.stateService.cart = [];
      this.stateService.totalPrice = 0;
      this.stateService.isEmptyCart = true;
      this.orderDetails = orderDetails;

    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    });

    observable2.subscribe(deleteCart => {
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  onMyOrderClicked() {
    this.router.navigate(["orders"])
  }

  onContinueShoppingClicked() {
    this.router.navigate([""])
  }

  saveTextAsFile(data: any, filename: any) {

    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    var blob = new Blob([data], { type: 'text/plain' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')

    var e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
  }

  onDownloadReceiptClicked() {
    let text = `
ORDER NO.: ${this.orderDetails.orderId}
ORDER DATE.: ${this.orderDetails.orderDate}
_____________________\r\n


SHIPPED TO: 
${this.stateService.userDetails.fullName}
${this.orderDetails.city}
${this.orderDetails.address}
Shipping Data: ${this.orderDetails.shippingDate}
_____________________\r

Purchased Items:\r
`;

    this.orderDetails.products.forEach(product => {
      text = text + `
  *
  Item: ${product.name}
  Description: ${product.description}
  Qty: ${product.amount}
  Price: ${product.price}\r\n
  `
    });

    text = text + `
Total price: ${this.orderDetails.address} ₪
_____________________\r
Thank you for purchasing our stor!\r\n`

    let fileName = `order ${this.orderDetails.orderId}.txt`
    this.saveTextAsFile(text, fileName);
  }

}
