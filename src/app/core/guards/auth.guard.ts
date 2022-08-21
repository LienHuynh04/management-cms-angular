import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';

// Core Module

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.tokenService.accessToken) {
      return this.router.navigate(['login']);
    }
    if (this.tokenService.accessToken && !this.authenticationService.currentUserValue) {
      return this.authenticationService.profile();
    }
    return true;
  }
}
