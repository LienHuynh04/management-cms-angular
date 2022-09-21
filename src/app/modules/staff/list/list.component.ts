import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, UserInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService, UserService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<UserInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.user;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public authService: AuthenticationService,
    private fb: FormBuilder,
    public modalService: NzModalService
  ) {
    super(activatedRoute, modalService);
  }

  ngOnInit(): void {
    this.initFormFilter();
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      login_id: [null],
      full_name: [null],
      email: [null]
    });
    return this.filterForm;
  }

  confirm(id: number | string | undefined) {
    this.userService.delete(id).subscribe(() => {
      this.processData(this.userService.getAll(super.processFilter()));
    });
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.userService.getAll(super.processFilter());
    this.processData(request);
  }
}
