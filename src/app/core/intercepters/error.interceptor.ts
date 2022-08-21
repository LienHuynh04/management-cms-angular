import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((resp, http) => {
        this.tokenService.clearToken();
        this.router.navigate(['login'])
        return throwError(resp);
      })
    );
  }
}
