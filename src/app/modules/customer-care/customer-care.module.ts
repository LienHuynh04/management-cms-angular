import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerCareRoutingModule } from './customer-care-routing.module';
import {ListComponent} from './list/list.component';
import {SaveComponent} from './save/save.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    SaveComponent
  ],
  imports: [
    CommonModule,
    CustomerCareRoutingModule,
    SharedModule
  ]
})
export class CustomerCareModule { }
