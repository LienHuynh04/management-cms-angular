import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectNewRoutingModule } from './project-new-routing.module';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ListComponent, SaveComponent],
  imports: [
    CommonModule,
    ProjectNewRoutingModule,
    SharedModule,
    NgxMaskModule
  ]
})
export class ProjectNewModule {
}
