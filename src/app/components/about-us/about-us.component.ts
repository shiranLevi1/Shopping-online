import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public numberOfOrders: number;
  constructor(private ordersService: OrdersService, public stateService: StateService) { }

  ngOnInit(): void {
    const observable = this.ordersService.getNumberOfOrders();
    
    observable.subscribe(numberOfOrders => {
    this.numberOfOrders = numberOfOrders;
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

}
