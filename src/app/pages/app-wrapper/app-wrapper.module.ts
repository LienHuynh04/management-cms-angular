import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppWrapperRoutingModule } from './app-wrapper-routing.module';
import { AppWrapperComponent } from './app-wrapper.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from '../../modules/profile/profile.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [AppWrapperComponent, ProfileComponent],
  imports: [
    CommonModule,
    AppWrapperRoutingModule,
    NgxPermissionsModule,
    SharedModule,
  ],
  providers: [NzNotificationService]
})
export class AppWrapperModule {
}
