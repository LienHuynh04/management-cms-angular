import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StaffCareComponent } from './staff-care/staff-care.component';


@NgModule({
  declarations: [ListComponent, SaveComponent, StaffCareComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CustomerModule {
}
