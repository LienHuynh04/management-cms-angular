import { Component, Inject, OnInit } from '@angular/core';
import { CareInterface, ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface } from '../../../core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTable } from '../../../shared/abstracts';
import { CareService } from '../../../core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<CareInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.care;
  care: CareInterface[] = [];
  customer!: CustomerInterface;
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private careService: CareService,
    public modalService: NzModalService,
    public notification: NzNotificationService,
    private router: Router
  ) {
    super(activatedRoute, modalService, notification);
    this.care = this.records[0]?.customer?.care || [];
    this.customer = this.resolvedData.customer;

    // if (!this.records.length) {
    //   this.router.navigate(['customers']);
    //   this.notification.info('Không có danh sách nhân viên chăm sóc', '');
    // }
  }

  ngOnInit(): void {
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.careService.getAll(super.processFilter());
    this.processData(request);
  }

  confirm(id?: number | string | undefined) {
    this.careService.delete(+this.customer.id, id).subscribe(() => {
      this.processData(this.careService.getAll(+this.customer.id));
      super.confirm(id);
    });
  }
}
