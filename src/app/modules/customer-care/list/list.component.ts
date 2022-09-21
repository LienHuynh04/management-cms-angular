import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerCareInterface} from '../../../core/interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseTable} from '../../../shared/abstracts';
import {CustomerCareService} from '../../../core/services';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<CustomerCareInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.care;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private careService: CustomerCareService,
    public modalService: NzModalService
  ) {
    super(activatedRoute, modalService);
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
