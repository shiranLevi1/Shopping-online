import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public creditCard: number;
  public shippingDate: string;
  public shippingDateError: string;
  public creditCardError: string;
  public error: boolean = false;

  constructor(public stateService: StateService, private usersService: UsersService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    const observable = this.usersService.getUserDetails();

    observable.subscribe(userDetails => {
      this.stateService.userDetails = userDetails;
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  onEditDetailsClicked() {
    this.router.navigate(["editProfile"])
  }

  onShippingDateChanged(event: any) {

    this.validateDate(event.target.value);
    if (!this.error) {
      const observable = this.ordersService.isAbleShippingDate(event.target.value);

      observable.subscribe(isAbleShippingDate => {
        if (!isAbleShippingDate) {

          this.shippingDateError = "* Unable date please select another date";
          this.error = true;
        }
        else {
          this.shippingDate = "";
          this.error = false;
          this.shippingDate = event.target.value;
        }
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      });
    }

  }

  onOrderClicked() {
    this.validateDate(this.shippingDate);
    this.validateCreditCard(this.creditCard);
    let fixed4DigitCreditCard = this.fourDigitOfPayment(this.creditCard);

    let orderData: OrderDetails = {
      totalPrice: this.stateService.totalPrice,
      city: this.stateService.userDetails.city,
      address: this.stateService.userDetails.address,
      shippingDate: this.shippingDate,
      creditCard: fixed4DigitCreditCard
    }

    if (!this.error) {
      const observable = this.ordersService.newOrder(orderData);

      observable.subscribe(newOrder => {
        this.router.navigate(["thanksForOrder"]);
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      });
    }
  }

  fourDigitOfPayment(card: number) {
    let fixedCard = card.toString().slice(card.toString().length - 4);

    return fixedCard;
  }

  validateCreditCard(creditCard: any) {
    if (!creditCard) {
      this.creditCardError = "* You can not provide an empty field"
      this.error = true
    }
    else if (creditCard.toString().length != 6 && creditCard.toString().length != 16) {
      this.creditCardError = "* Invalid Credit card"
      this.error = true
    }
    else {
      this.creditCardError = "";
      this.error = false;
    }
  }

  getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let fixedToday = yyyy + '-' + mm + '-' + dd;

    return fixedToday;
  }

  validateDate(date: any) {
    let today = this.getToday();

    if (!date) {
      this.shippingDateError = "* You can not provide an empty field"
      this.error = true
    }
    else if (today > date) {
      this.shippingDateError = "* You can not provide date in the past"
      this.error = true
    }
    else {
      this.shippingDateError = "";
      this.error = false;
    }
  }

}
