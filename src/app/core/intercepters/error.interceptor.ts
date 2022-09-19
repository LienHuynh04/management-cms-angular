import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CredentialsService} from '../services/credentials.service';
import {LoadingOverlayService} from '../services/loading.service';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private loadingOverlayService: LoadingOverlayService,
    private credentialService: CredentialsService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingOverlayService.isLoading = true;
    // If the call fails, retry until 2 times before throwing an error
    return next.handle(request).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      finalize(() => {
        this.loadingOverlayService.isLoading = false;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 403) {
          this.router.navigate(['/profile']);
        }
        if (err.status == 401) {
          this.authenticationService.clearAndLogout();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }

}

export const ErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
