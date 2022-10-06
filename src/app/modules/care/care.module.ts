import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareRoutingModule } from './care-routing.module';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SharedModule } from '../../shared/shared.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    ListComponent,
    SaveComponent
  ],
  imports: [
    CommonModule,
    CareRoutingModule,
    SharedModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzBadgeModule
  ]
})
export class CustomerCareModule {
}
