import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationData = {
    email: "",
    id: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    address: ""
  }
  public isNext = false;
  public confirmedPassword: string;
  public error: boolean = false;
  public confirmedPasswordError: string;
  public passwordError: string;
  public emailError: string;
  public idError: string;
  public firstNameError: string;
  public lastNameError: string;
  public cityError: string;
  public addressError: string;

  constructor(public stateService: StateService, private usersService: UsersService, private router: Router) { }
  ngOnInit(): void {

  }

  onAllreadyRegisteredClicked() {
    this.router.navigate(["login"])
  }

  onEmailChanged(event: any) {

    this.registrationData.email = event.target.value;

    const observable = this.usersService.isEmailExsist(this.registrationData.email);

    observable.subscribe(isEmailExsist => {
      if (!isEmailExsist) {
        this.emailError = "";
        this.error = false;
        return;
      }

      this.emailError = "* Email allready token";
      this.error = true;
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  onIdChanged(event: any) {
    this.registrationData.id = event.target.value;

    const observable2 = this.usersService.isIdExsist(this.registrationData.id);

    observable2.subscribe(isIdExsist => {
      if (!isIdExsist) {
        this.idError = "";
        this.error = false;
        return;
      }
      this.idError = "* Id allready token";
      this.error = true;
    }, serverErrorResponse => {
      console.log("Error! " + serverErrorResponse.message);
      alert("Error! " + serverErrorResponse.message)
    })
  }

  onConfirmPasswordChanged(event: any) {
    this.confirmedPassword = event.target.value;
    this.confirmedPasswordError = ""

    if (this.registrationData.password != this.confirmedPassword) {
      this.confirmedPasswordError = "* Psswords doesn't match"
      this.error = true;
    }
    this.error = false;
  }

  onNextClicked() {
    this.validateInputs(this.registrationData.email, this.registrationData.id, this.registrationData.password, this.confirmedPassword)
    if (!this.error) {
      this.isNext = true;
    }
    else {
      this.isNext = false;
    }
  }

  onBackClicked() {
    this.isNext = false;
  }

  onCityOptionSelected(event: any) {
    this.registrationData.city = event.target.value;
  }

  onRegisterClicked() {
    this.validateInputsBeforRegister(this.registrationData.firstName, this.registrationData.lastName, this.registrationData.city, this.registrationData.address)
    if (!this.error) {
      const observable = this.usersService.register(this.registrationData);

      observable.subscribe(successfulServerRequestData => {
        this.isNext = false;
        this.router.navigate(["/login"]);
      }, serverErrorResponse => {
        console.log("Error! " + serverErrorResponse.message);
        alert("Error! " + serverErrorResponse.message)
      })
    }

  }

  validateInputsBeforRegister(firstName: string, lastName: string, city: string, address: string) {
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
    else if (!city) {
      this.cityError = "* You can not provide an empty feild";
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
      this.error = false;
    }
  }

  validateInputs(email: string, id: string, password: string, confirmPassword: string) {
    if (!email) {
      this.emailError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (!this.validateEmail(email)) {
      this.emailError = "* Invalid email";
      this.error = true;
    }
    else if (!id) {
      this.idError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (id.length < 9) {
      this.idError = "* I.D too short";
      this.error = true;
    }
    else if (id.length > 9) {
      this.idError = "* I.D too long";
      this.error = true;
    }
    else if (!password) {
      this.passwordError = "* You can not provide an empty feild";
      this.error = true;
    }
    else if (password.length < 4) {
      this.passwordError = "* Password too short";
      this.error = true;
    }
    else if (!confirmPassword) {
      this.confirmedPasswordError = "* You can not provide an empty feild";
      this.error = true;
    }
    else {
      this.clearErrors()
      this.error = false;
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  clearErrors() {
    this.emailError = "";
    this.idError = "";
    this.passwordError = "";
    this.confirmedPasswordError = "";
  }

}
