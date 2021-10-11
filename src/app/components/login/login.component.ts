import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';
import { NewPurchaseComponent } from '../new-purchase/new-purchase.component';
import { OpenCartModalComponent } from '../open-cart-modal/open-cart-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginDetails = {
    email: "",
    password: ""
  }
  public error: string = "";

  constructor(private usersService: UsersService, private cartsService: CartsService, private router: Router, private dialog: MatDialog, public stateService: StateService,) { }
  ngOnInit(): void {
  }

  onLoginClicked() {
    this.validateInputs(this.loginDetails.email, this.loginDetails.password);

    if (this.error == "") {

      const observable = this.usersService.login(this.loginDetails);

      observable.subscribe(successfulServerRequestData => {

        this.stateService.userName = successfulServerRequestData.fullName;
        localStorage.setItem('username', successfulServerRequestData.fullName);
        localStorage.setItem('token', "Bearer " + successfulServerRequestData.token);

        if (successfulServerRequestData.userType == "ADMIN") {
          this.router.navigate(["/admin"]);
        }
        else {
          if (successfulServerRequestData.isNewCustomer == 1) {
            this.dialog.open(NewPurchaseComponent);
            this.stateService.isLoggedIn = true;
            this.router.navigate(["/home"]);
          }
          else {
            const observable = this.cartsService.getUserCart();

            observable.subscribe(cartPruducts => {
              if (cartPruducts.length != 0) {
                this.dialog.open(OpenCartModalComponent);
              }
            }, serverErrorResponse => {
              console.log("Error! " + serverErrorResponse.message);
              alert("Error! " + serverErrorResponse.message)
            });
            this.stateService.isLoggedIn = true;
            this.router.navigate(["/home"]);
          }
        }

      }, serverErrorResponse => {
        this.error = serverErrorResponse.error.error;
      })
    }
  }

  validateInputs(email: string, password: string) {
    if (!email) {
      this.error = "* You can not provide an empty feild"
    }
    if (!password) {
      this.error = "* You can not provide an empty feild"
    }
    else {
      this.error = ""
    }
  }

  onCreateAccountClicked() {
    this.router.navigate(["register"])
  }
}