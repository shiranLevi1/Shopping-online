import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CartComponent } from '../components/cart/cart.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminComponent } from '../components/admin/admin.component';
import { MatSliderModule } from '@angular/material/slider';
import { OrderComponent } from '../components/order/order.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ThanksForOrderComponent } from '../components/thanks-for-order/thanks-for-order.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { AddProductComponent } from '../components/add-product/add-product.component';

const routes: Routes = [
  { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
  // { path: "admin/editProduct", canActivate: [AdminGuard], component: EditProductComponent },
  { path: "admin/addProduct", canActivate: [AdminGuard], component: AddProductComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "cart", canActivate: [CustomerGuard], component: CartComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "order", canActivate: [CustomerGuard], component: OrderComponent },
  { path: "editProfile", component: EditProfileComponent },
  { path: "thanksForOrder", canActivate: [CustomerGuard], component: ThanksForOrderComponent },
  { path: "orders", canActivate: [CustomerGuard], component: OrdersComponent },
  { path: "orderDetails", canActivate: [CustomerGuard], component: OrderDetailsComponent },


  // { path: "contact-us", component: ContactUsComponent },
  // { path: "login", component: LoginComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    RouterModule.forRoot(routes) // Importing the above routes
  ]
})
export class RoutingModule {

}
