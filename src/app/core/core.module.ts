import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COLUMNS} from './interfaces/column.interface';
import {column} from '../config/column';
import {navigations} from '../config/menu';
import {NAVIGATIONS} from './interfaces/navigation';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: COLUMNS, useValue: column},
    {provide: NAVIGATIONS, useValue: navigations},
  ]
})
export class CoreModule { }
