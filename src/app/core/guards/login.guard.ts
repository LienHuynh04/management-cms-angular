import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';


@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenService.accessToken;
    console.log(currentUser);
    if (currentUser) {
      // logged in so return true
      this.router.navigate(['/']);
    }
    return true;
  }
}
