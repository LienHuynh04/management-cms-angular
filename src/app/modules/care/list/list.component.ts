import { Component, Inject, OnInit } from '@angular/core';
import { CareInterface, ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface } from '../../../core/interfaces';
import { ActivatedRoute } from '@angular/router';
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
  cares: CareInterface[] = [];
  customer!: CustomerInterface;
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private careService: CareService,
    public modalService: NzModalService,
    public notification: NzNotificationService
  ) {
    super(activatedRoute, modalService, notification);
    this.cares = this.records[0]?.customer?.care || [];
    this.customer = this.resolvedData.customer;
    console.log(this.cares);
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
}
