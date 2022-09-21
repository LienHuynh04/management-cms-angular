import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';
import {CareTableComponent} from '../care-table/care-table.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<CustomerInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.customer;
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public modalService: NzModalService
  ) {
    super(activatedRoute, modalService);
  }

  ngOnInit(): void {
    this.initFormFilter();
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      full_name: [null],
      phone_number: [null],
      address: [null],
      email: [null]
    });
    return this.filterForm;
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.customerService.getAll(super.processFilter());
    this.processData(request);
  }

  openModalCare(care: any) {
    this.modalService.create({
      nzTitle: 'Thông tin nhân viên chăm sóc',
      nzContent: CareTableComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '70vw',
      nzStyle: {
        top: '30%'
      },
      nzComponentParams: {
        care: care
      }
    });
  }
}
