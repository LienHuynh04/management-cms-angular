import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';

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
    private customerService: CustomerService
  ) {
    super(activatedRoute)
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
}
