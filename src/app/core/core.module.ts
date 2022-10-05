import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COLOR_CHART, COLUMNS, NAVIGATIONS, OPTION_CHART } from './interfaces';
import { column } from '../config/column';
import { navigations } from '../config/menu';
import { AuthInterceptor, AuthInterceptorProviders } from './intercepters/auth.interceptor';
import { ErrorInterceptor, ErrorInterceptorProviders } from './intercepters/error.interceptor';
import { LoadingOverlayInterceptor } from './intercepters/loading-overlay-interceptor.service';
import { LoadingOverlayService } from './services/loading.service';
import { GlobalErrorHandler } from './intercepters/global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ColorChart, OptionsChart } from '../config/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingOverlayInterceptor, multi: true},
    {provide: NAVIGATIONS, useValue: navigations},
    {provide: COLUMNS, useValue: column},
    {provide: OPTION_CHART, useValue: OptionsChart},
    {provide: COLOR_CHART, useValue: ColorChart},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    AuthInterceptorProviders,
    ErrorInterceptorProviders,
    LoadingOverlayService,
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
