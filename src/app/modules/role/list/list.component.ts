import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, IRole} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<IRole> implements OnInit {
  cols: ColumnInterface[] = this.colums.role;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService
  ) {
    super(activatedRoute);
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
