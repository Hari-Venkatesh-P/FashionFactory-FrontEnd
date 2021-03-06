import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {   HttpClientModule ,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { OrderComponent } from './order/order.component';
import { InterceptorService } from './interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    SidebarComponent,
    AddproductComponent,
    ShoppingcartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    AppRoutingModule,
  ],
  providers: [{  
    provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true 
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
