import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppWrapperRoutingModule } from './app-wrapper-routing.module';
import { AppWrapperComponent } from './app-wrapper.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AppWrapperComponent],
  imports: [
    CommonModule,
    AppWrapperRoutingModule,
    SharedModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ]
})
export class AppWrapperModule { }
