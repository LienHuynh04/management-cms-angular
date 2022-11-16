import { Component, Inject, OnInit } from '@angular/core';
import { ColumnConfig, ColumnInterface, COLUMNS, ProjectInterface } from '../../../core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, ProjectService } from '../../../core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SaveComponent } from '../save/save.component';
import { BaseTable } from '../../../shared/abstracts';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<ProjectInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.project;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public modalService: NzModalService,
    public notification: NzNotificationService,
    public fb: FormBuilder,
    public authService: AuthenticationService,
  ) {
    super(activatedRoute, modalService, notification, authService);
  }

  ngOnInit(): void {
    this.initForm()
  }

  confirm(id: number | string | undefined) {
    this.projectService.delete(id).subscribe(() => {
      this.processData(this.projectService.getAll({...super.processFilter(), 'filter[type_project]': 0}));
      super.confirm();
    });
  }

  initForm() {
    this.filterForm = this.fb.group({
      name: ['']
    })
  }

  openModal(id?: number | string | undefined) {
    const modal = this.modalService.create({
      nzTitle: id ? 'Cập nhật' : 'Tạo mới',
      nzContent: SaveComponent,
      nzComponentParams: {
        id: id
      },
    });

    modal.afterClose.subscribe((res) => {
      this.filterForm.reset();
      if (res) {
        this.setDataAndPagination(res.data, res.pagination);
      }
    });
  }


  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.projectService.getAll({...super.processFilter(), 'filter[type_project]': 0});
    this.processData(request);
  }
}
