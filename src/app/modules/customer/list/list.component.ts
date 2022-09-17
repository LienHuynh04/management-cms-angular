import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.customers = resolvedData.data;
  }
}
