import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareRoutingModule } from './care-routing.module';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SharedModule } from '../../shared/shared.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';


@NgModule({
  declarations: [
    ListComponent,
    SaveComponent
  ],
    imports: [
        CommonModule,
        CareRoutingModule,
        SharedModule,
        NzCollapseModule
    ]
})
export class CustomerCareModule {
}
