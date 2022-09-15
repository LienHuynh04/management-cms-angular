import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CredentialsService} from '../services/credentials.service';


@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      // logged in so return true
      this.router.navigate(['/']);
    }
    return true;
  }
}
