import { Component, Inject, OnInit } from '@angular/core';
import { ColumnConfig, ColumnInterface, COLUMNS, StaffInterface } from '../../../core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, StaffService } from '../../../core/services';
import { BaseTable } from '../../../shared/abstracts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleEnum } from '../../../core/enums';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<StaffInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.staff;
  roleEnum = RoleEnum;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private staffService: StaffService,
    public authService: AuthenticationService,
    private fb: FormBuilder,
    public modalService: NzModalService,
    public notification: NzNotificationService,
  ) {
    super(activatedRoute, modalService, notification);
  }

  ngOnInit(): void {
    this.initFormFilter();
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      login_id: [null],
      full_name: [null],
      email: [null]
    });
    return this.filterForm;
  }

  confirm(id: number | string | undefined): void {
    this.staffService.delete(id).subscribe(() => {
      this.processData(this.staffService.getAll(super.processFilter()));
      super.confirm();
    });
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.staffService.getAll(super.processFilter());
    this.processData(request);
  }
}
