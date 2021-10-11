import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { RouterModule } from '@angular/router';
import { AddProductToCartComponent } from '../components/add-product-to-cart/add-product-to-cart.component';
import { AdminComponent } from '../components/admin/admin.component';
import { CartComponent } from '../components/cart/cart.component';
import { CategoriesNavbarComponent } from '../components/categories-navbar/categories-navbar.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { OrderComponent } from '../components/order/order.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ProductComponent } from '../components/product/product.component';
import { RegisterComponent } from '../components/register/register.component';
import { ThanksForOrderComponent } from '../components/thanks-for-order/thanks-for-order.component';
import { AppComponent } from '../components/app/app.component';
import { CategoryPipe } from '../pipes/category.pipe';
import { AuthenticationInterceptor } from '../models/AuthenticationInterceptor';
import { ProductsService } from '../services/products.service';
import { UsersService } from '../services/users.service';
import { SearchPipe } from '../pipes/search.pipe';
import { OpenCartModalComponent } from '../components/open-cart-modal/open-cart-modal.component';
import { NewPurchaseComponent } from '../components/new-purchase/new-purchase.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MiniCartComponent } from '../components/mini-cart/mini-cart.component';
import { CartSearchPipe } from '../pipes/cart-search.pipe';
import { LogoutModalComponent } from '../components/logout-modal/logout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    AddProductComponent,
    AddProductToCartComponent,
    AdminComponent,
    CartComponent,
    CategoriesNavbarComponent,
    EditProductComponent,
    EditProfileComponent,
    LoginComponent,
    NavbarComponent,
    OrderComponent,
    OrderDetailsComponent,
    OrdersComponent,
    ProductComponent,
    RegisterComponent,
    ThanksForOrderComponent,
    CategoryPipe,
    SearchPipe,
    OpenCartModalComponent,
    NewPurchaseComponent,
    MiniCartComponent,
    CartSearchPipe,
    LogoutModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [UsersService,
    ProductsService,{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [OpenCartModalComponent, AddProductToCartComponent, EditProductComponent]
})
export class AppModule { }
