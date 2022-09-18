import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, ProjectInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {ProjectService} from '../../../core/services';
import {NzModalService} from 'ng-zorro-antd/modal';
import {SaveComponent} from '../save/save.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.project;
  projects !: ProjectInterface[];

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.projects = resolvedData.data;
  }

  confirm(id: number | string | undefined) {
    this.projectService.delete(id).pipe(
      switchMap(() => {
        return this.projectService.getAll();
      })
    ).subscribe((resp: any) => {
      this.projects = resp.data;
    });
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
      if(res) {
        this.projects = res.data
      }
    });
  }
}
