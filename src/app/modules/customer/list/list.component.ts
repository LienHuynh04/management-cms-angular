import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface, IPaginateList} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../core/services';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.customer;
  customers!: CustomerInterface[];

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.customers = resolvedData.data;
  }

  confirm(id: number) {
    this.customerService.delete(id).pipe(
      switchMap(() => {
        return this.customerService.getAll()
      })
    ).subscribe(resp => {
      this.customers = resp.data;
    })
  }
}
