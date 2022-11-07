import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [ListComponent, SaveComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        SharedModule,
        NzDatePickerModule,
    ]
})
export class CustomerModule {
}
