import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, IRole} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';
import {NzModalService} from 'ng-zorro-antd/modal';
import {RoleEnum} from '../../../core/enums';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<IRole> implements OnInit {
  cols: ColumnInterface[] = this.colums.role;
  roleEnum = RoleEnum;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    public modalService: NzModalService,
    public notification: NzNotificationService,
  ) {
    super(activatedRoute, modalService, notification);
  }

  ngOnInit(): void {

  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.roleService.getAll();
    this.processData(request);
  }
}
