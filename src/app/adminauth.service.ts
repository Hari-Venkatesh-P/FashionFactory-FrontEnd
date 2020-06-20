import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService  implements CanActivate {

  constructor(private userService :UserService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.userService.isAdminLoggedIn() && this.userService.isTokenPresent())
      return true;

    this.router.navigate(['/home']);
    return false;
  }
}
