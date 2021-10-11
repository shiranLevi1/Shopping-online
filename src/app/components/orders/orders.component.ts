import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public isNoOrders: boolean = true;
  public allOrders: any[] = [];
  public image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX///8AAACEhISFhYWJiYno6OjJycn19fVzc3N7e3u1tbXx8fHf39+qqqq4uLhpaWliYmJSUlKPj49AQECYmJhZWVlCQkJJSUnLy8tPT0/dazVuAAACeklEQVR4nO3di1LiQBBAUSbvBDRBguL//+iWtVW6i5MEih6607nnA3Ru8TAwaWe3AwAAAAAAAAAAAAAA8Gjftc1wHpq222svJYlLH370lfZyxB2O4X/Hg/aSZL2E3160FyXpLRIYQqG9LDnxwBDetBcm5XUiMIRX7aXJqCcDQ6i1FyeinSlstBcnoZwJDKHUXp6AYrbQwftp/T5beFr/K3H+SerhaVotFK7/AnVcKBy1F/iwfKEw017gwzIKtRf4MAoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptM9/4fztpRZvMK3LasyzmxUfC4UfRX6TLMuzfLyUqe9HLYvTwopTOxUp70itG+W8v5pkj+P03MSzJZrTWLoX9pmSTNtMjfboSJAYmz7TJD75dtAu+kV6fvF6QFLfUTbwot0TcREt7Jd/4dP1koF77ZooyYnwTjsmqhMsnBsh1NMKFtq4Hr0mOZ45aMdEDYKFZ+2YqLNgof/H0P/r0P97qf+/h/6vafxfly7OK2sQnpF2//lwA5/x/X9Pszx2/lxJtjssfZ2Y6L8Tuf/OewP7Fjv/e09fvvYPb98+vGX/8I6fNlbJ9w/vt7494Hv538enkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KFx/of/znvyf2eX/3DX/Z+fV87fcOjj/0P8Zlhs4h3R2PNPFWbIbOA/Y/5nOGziXe+r91MP76LfY5FuC6TNNh+sRzU/x+UF11b+zxP36L0dj9l3bDOehaTvRKWwAAAAAAAAAAAAAAAAz/gBf0Sp4i/BPhgAAAABJRU5ErkJggg=="

  constructor(private ordersService: OrdersService, public stateService: StateService, private router: Router) { }

  ngOnInit(): void {

    const observable = this.ordersService.getUserOrders();

    observable.subscribe(allOrders => {
      this.allOrders = allOrders;
      if (this.allOrders.length != 0) {
        this.isNoOrders = false;
      }
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  onMoreInfoClicked(productId: any) {
    this.allOrders.forEach(order => {
      if (order.order.orderId == productId) {
        this.stateService.orderData = order;
        return;
      }
    });
    this.router.navigate(["orderDetails"])
  }

  onStartShoppingClicked() {
    this.router.navigate(["home"])
  }

}
