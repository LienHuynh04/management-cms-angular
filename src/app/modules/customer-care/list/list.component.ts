import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerCareInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CustomerCareService} from '../../../core/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.user;
  customers!: CustomerCareInterface[];

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private customerCareService: CustomerCareService
  ) {
  }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.customers = resolvedData.data;
  }

    confirm(id: number | string | undefined){
    this.customerCareService.delete(id).pipe(
      switchMap(() => {
        return this.customerCareService.getAll();
      })
    ).subscribe((resp) => {
      this.customers = resp.data;
    });
  }
}
