import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
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
  project!: any;

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
    this.project = resolvedData.data;
  }

  confirm(id: number) {
    this.projectService.delete(id).pipe(
      switchMap(() => {
        return this.projectService.getAll();
      })
    ).subscribe((resp: any) => {
      this.project = resp.data;
    });
  }

  openModal(id?: number) {
    const modal = this.modalService.create({
      nzTitle: id ? 'Cập nhật' : 'Tạo mới',
      nzContent: SaveComponent,
      nzComponentParams: {
        id: id
      },
    });

    modal.afterClose.subscribe(() => {
      this.projectService.getAll().subscribe((resp) => {
        this.project = resp.data;
      });
    });
  }
}
