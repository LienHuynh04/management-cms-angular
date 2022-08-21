import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppWrapperRoutingModule} from './app-wrapper-routing.module';
import {AppWrapperComponent} from './app-wrapper.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NgxPermissionsModule} from 'ngx-permissions';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [AppWrapperComponent],
  imports: [
    CommonModule,
    AppWrapperRoutingModule,
    NgxPermissionsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzCardModule,
    NzButtonModule,
    NzTableModule,
    NzGridModule
  ]
})
export class AppWrapperModule {
}
