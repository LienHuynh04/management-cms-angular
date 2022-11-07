import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ValueColumnPipe } from './pipes/value-column.pipe';

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
const PIPES = [
  ValueColumnPipe
]

@NgModule({
  declarations: [ControlErrorsComponent, ...PIPES],
  imports: [
    CommonModule,
    NgxPermissionsModule,
    ...ANTD
  ],
  exports: [
    ControlErrorsComponent,
    NgxPermissionsModule,
    ...PIPES,
    ...ANTD
  ],
  providers: [NzModalService]
})
export class SharedModule {
}
