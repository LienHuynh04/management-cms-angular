import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppWrapperRoutingModule} from './app-wrapper-routing.module';
import {AppWrapperComponent} from './app-wrapper.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [AppWrapperComponent],
  imports: [
    CommonModule,
    AppWrapperRoutingModule,
    NgxPermissionsModule,
    SharedModule
  ]
})
export class AppWrapperModule {
}
