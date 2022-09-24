import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';
import { CredentialsService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
    private injector: Injector,
    public credentialService: CredentialsService,
    public router: Router
  ) {
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      // Server Error happened (error.status === 403, 404...)
      this.handleServerError(error.error);
    } else {
      // Client Error happened (Angular Error, ReferenceError...)
      this.handleClientError(error);
    }
  }

  // Customize the default server error handler here if needed
  private handleServerError(error: HttpErrorResponse | any): void {
    const notifyService = this.injector.get(NzNotificationService);
    if (error.code !== 422) {
      if (!navigator.onLine) {
        // No Internet connection
        notifyService.error('Error', 'No Internet Connection');
        return;
      }

      if (!environment.production) {
        // Http Error
        // Show notification to the user
        notifyService.error(
          error?.message || error.error?.message || 'This action is unauthorized',
          '');
      }
    }
  }

  private handleClientError(error: Error): void {

  }

}
