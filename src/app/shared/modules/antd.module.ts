import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';


const ANTD = [
  NzGridModule,
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzDropDownModule,
  NzCardModule,
  NzButtonModule,
  NzTableModule,
  NzPopconfirmModule,
  NzFormModule,
  ReactiveFormsModule,
  NzInputModule,
  NzCheckboxModule,
  NzSelectModule,
  NzModalModule,
  NzToolTipModule,
  NzRadioModule,
  NzSpinModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ANTD
  ],
  exports: [
    ...ANTD
  ]
})
export class AntdModule {
}
