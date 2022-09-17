import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.user;
  customers!: any;
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.customers = resolvedData?.data;
  }

  confirm(id: number) {
    this.userService.delete(id).pipe(
      switchMap(() => {
        return this.userService.getAll()
      })
    ).subscribe((resp: any) => {
      this.customers = resp.data;
    })
  }
}
