import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, UserInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../../core/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.user;
  users!: UserInterface[];
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.users = resolvedData?.data;
  }

  confirm(id: number | string | undefined) {
    this.userService.delete(id).pipe(
      switchMap(() => {
        return this.userService.getAll();
      })
    ).subscribe((resp: any) => {
      this.users = resp.data;
    });
  }
}
