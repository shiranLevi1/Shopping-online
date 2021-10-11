import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: '0%' }),
        animate('200ms ease-in', style({ opacity: '100%' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: '0%' })),
      ]),
    ]),
  ],
})
export class EditProfileComponent implements OnInit {
  public isEditSucceed: boolean;
  public userData: IUser;
  public isEmailChanged: boolean = false;
  public error: boolean = false;
  public emailError: string;
  public addressError: string;
  public firstNameError: string;
  public lastNameError: string;

  constructor(public stateService: StateService, private productsService: ProductsService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    const observable = this.usersService.getUserDetails();

    observable.subscribe(userDetails => {
      this.userData = userDetails;
    }, serverErrorResponse => {
      alert("Error! " + serverErrorResponse.message)
    });
  }

  onEmailChanged() {
    this.isEmailChanged = true;
  }

  onCityOptionSelected(event: any) {
    this.userData.city = event.target.value;
  }

  onCancelClicked() {
    this.router.navigate([""]);
  }

  onSaveChangesClicked() {

    this.validateInputs(this.userData.email, this.userData.address, this.userData.firstName, this.userData.lastName)

    if (this.isEmailChanged) {
      this.validateEmail(this.userData.email);
      if (!this.error) {
        const observable = this.usersService.updateUserEmail(this.userData.email);
        
        observable.subscribe(userDetails => {
        }, serverErrorResponse => {
          console.log("Error! " + serverErrorResponse.message);
          alert("Error! " + serverErrorResponse.message)
        });
      }
    }

    if (!this.error) {
      const observable = this.usersService.updateUserDetails(this.userData);

      observable.subscribe(userDetails => {
        this.isEditSucceed = true;
        setTimeout(() => {
          this.isEditSucceed = false;
          this.router.navigate([""])
        }, 2000);
      }, serverErrorResponse => {
        alert("Error! " + serverErrorResponse.message)
      });
    }
  }

  isValidEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  validateEmail(email: string) {
    if (!email) {
      this.emailError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (!this.isValidEmail(email)) {
      this.emailError = "* Invalid email";
      this.error = true;
    }
    else {
      this.clearErrors();
    }
  }

  validateInputs(email: string, address: string, firstName: string, lastName: string) {
    if (!firstName) {
      this.firstNameError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (firstName.length < 2) {
      this.firstNameError = "* First name too short";
      this.error = true;
    }
    else if (firstName.length > 15) {
      this.firstNameError = "* First name too long";
      this.error = true;
    }
    else if (!lastName) {
      this.lastNameError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (lastName.length < 2) {
      this.lastNameError = "* Last name too short";
      this.error = true;
    }
    else if (lastName.length > 15) {
      this.lastNameError = "* Last name too long";
      this.error = true;
    }
    else if (!email) {
      this.emailError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (!address) {
      this.addressError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (address.length < 3) {
      this.addressError = "* Address too short";
      this.error = true;
    }
    else {
      this.clearErrors()
    }
  }

  clearErrors() {
    this.emailError = "";
    this.firstNameError = "";
    this.lastNameError = "";
    this.addressError = "";
    this.error = false;
  }

}
