import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedauthService implements CanActivate {

  constructor(private userService :UserService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( (sessionStorage.getItem('user') || sessionStorage.getItem('admin')) && sessionStorage.getItem('jwttoken'))
      return true;

    this.router.navigate(['/home']);
    return false;
  }
}
