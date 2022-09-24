import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { AuthenticationService, CredentialsService, LoadingOverlayService } from '../services';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private loadingOverlayService: LoadingOverlayService,
    private credentialService: CredentialsService,
    private router: Router,
    private notification: NzNotificationService
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
        if (err.status == 401) {
          this.credentialService.setCredentials();
          this.router.navigate(['', 'login']);
          this.notification.create('error', 'Lỗi đăng nhập', '')
        }
        if (err.status == 404) {
          this.router.navigate(['', '404']);
        }
        return throwError(err);
      })
    );
  }

}

export const ErrorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];
