import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredentialsService} from '../services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private credentialsService: CredentialsService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const credentials = this.credentialsService.credentials;
    const isLoggedIn = this.credentialsService.isAuthenticated();

    if (isLoggedIn && request.url.includes('/api')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${credentials?.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
