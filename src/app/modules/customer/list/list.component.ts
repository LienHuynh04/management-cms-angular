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
  fetchParams: any = {
    page: 1,
    per_page: 50
  };
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
      email: [null],
    });
    return this.filterForm;
  }

  onSearch(isReset = false) {
    if (isReset) {
      this.filterForm.reset();
    }
    let param: any = {};
    let filterData = {...this.filterForm.value};
    Object.keys(this.filterForm.value).forEach(key => {
      if (filterData[key]) {
        param[`filter[${key}]`] = filterData[key];
      }
    });

    this.customerService.getAll(param).subscribe(resp => {
      console.log(resp);
    });
  }
}
