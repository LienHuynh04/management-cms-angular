import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {ListComponent} from './list/list.component';
import {SaveComponent} from './save/save.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { CareTableComponent } from './care-table/care-table.component';


@NgModule({
  declarations: [ListComponent, SaveComponent, CareTableComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CustomerModule { }
