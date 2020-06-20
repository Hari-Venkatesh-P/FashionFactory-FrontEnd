import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { UserauthService } from './userauth.service';
import { AdminauthService } from './adminauth.service';
import { SharedauthService } from './sharedauth.service';




const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AddproductComponent,canActivate:[AdminauthService]},
  {path:"shoppingcart",component:ShoppingcartComponent,canActivate:[UserauthService]},
  {path:"order",component:OrderComponent,canActivate:[SharedauthService]},
  {path:"profile",component:ProfileComponent,canActivate:[UserauthService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
