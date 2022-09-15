import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {COLUMNS, NAVIGATIONS} from './interfaces';
import {column} from '../config/column';
import {navigations} from '../config/menu';
import {AuthInterceptorProviders} from './intercepters/auth.interceptor';
import {ErrorInterceptorProviders} from './intercepters/error.interceptor';
import {LoadingOverlayInterceptor} from './intercepters/loading-overlay-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingOverlayService} from './services/loading.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: COLUMNS, useValue: column},
    {provide: NAVIGATIONS, useValue: navigations},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingOverlayInterceptor, multi: true},
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
