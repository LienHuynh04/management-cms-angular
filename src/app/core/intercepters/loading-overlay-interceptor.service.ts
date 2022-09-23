import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from '../services/loading.service';

// Core Module

@Injectable()
export class LoadingOverlayInterceptor implements HttpInterceptor {
  totalRequests = 0;

  constructor(
    private loadingOverlayService: LoadingOverlayService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingOverlayService.isLoading = true;
    this.totalRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingOverlayService.isLoading = false;
        }
      })
    );
  }
}
