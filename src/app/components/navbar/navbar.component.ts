import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public searchValue: string = "";
  public isCartHovered: boolean = false;
  public isMiniCartHovered: boolean = false;

  constructor(public stateService: StateService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let userName = localStorage.getItem("username");

    if (token) {
      this.stateService.isLoggedIn = true;
    }

    if (userName) {
      this.stateService.userName = userName;
    }
  }

  onSignInClicked() {
    this.router.navigate(["/login"])
  }

  onSearchFeildClickd() {
    this.stateService.categoryId = null;
  }

  onRegisterClicked() {
    this.router.navigate(["register"])
  }

  onHomeClicked() {
    this.stateService.categoryId = null;
    if (this.stateService.isAdmin) {
      this.router.navigate(["Admin"]);
      return;
    }
    this.router.navigate([""])
  }

  onCartHovered() {
    if (this.stateService.isEmptyCart) {
      return;
    }

    this.isCartHovered = true;
  }

  onCartLeaved() {
    setTimeout(() => {
      this.isCartHovered = false;
    }, 300);
  }

  onMiniCartHovered() {
    this.isMiniCartHovered = true;
  }

  onMiniCartLeaved() {
    setTimeout(() => {
      this.isMiniCartHovered = false;
    }, 300);
  }

  closeMiniCart() {
    this.isMiniCartHovered = false;
    this.isCartHovered = false;
  }

  onCartClicked() {
    if (this.stateService.isEmptyCart) {
      this.router.navigate(["cart"])
    }
  }

  onAboutUsClicked() {
    this.router.navigate(["aboutUs"])
  }

  onAddProductClicked() {
    this.router.navigate(["admin/addProduct"])
  }

  onMyProfileClicked() {
    this.router.navigate(["editProfile"])
  }

  onOrdersClicked() {
    this.router.navigate(["orders"])
  }

  onLogoutClicked() {
    this.dialog.open(LogoutModalComponent)
  }

}
