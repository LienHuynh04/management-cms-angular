import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {ListComponent} from './list/list.component';
import {SaveComponent} from './save/save.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ListComponent, SaveComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule
  ]
})
export class TeamModule { }
