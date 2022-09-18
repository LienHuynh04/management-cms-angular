import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, IRole, UserInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {RoleService} from '../../../core/services';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.role;
  roles!: IRole[];
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.roles = resolvedData?.data;
  }

}
