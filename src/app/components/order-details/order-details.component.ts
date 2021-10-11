import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public orderData: any;
  constructor(public stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.orderData = this.stateService.orderData;
  }

  onAllOrdersClicked() {
    this.router.navigate(["orders"])
  }

}
