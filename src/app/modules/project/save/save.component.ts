import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingOverlayService, ProjectService } from '../../../core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BaseForm } from '../../../shared/abstracts';
import { Observable, throwError } from 'rxjs';
import { IPaginateList, ProjectInterface } from '../../../core/interfaces';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<ProjectInterface> implements OnInit {
  @Input() id !: number | string | undefined;
  project !: ProjectInterface[];

  constructor(
    private projectService: ProjectService,
    private modal: NzModalRef,
    private fb: FormBuilder,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public notification: NzNotificationService
  ) {
    super(modalService, loadingOverlayService, notification);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      name: ['', Validators.required]
    });
    if (this.id) {
      this.fetchData().subscribe(resp => {
        this.saveForm.patchValue(resp);
      });
    }
  }

  submitForm(): void {
    let source$: Observable<any> = this.id
      ? this.projectService.update(this.id, this.saveForm.value)
      : this.projectService.create(this.saveForm.value);
    source$.pipe(
      catchError((error: HttpErrorResponse | any) => {
        if (error.status === 422) {
          this.setFormErrors(error.error.errors);
        }
        return throwError(error);
      }),
      switchMap(() => this.projectService.getAll({'filter[type_project]': 0}))
    ).subscribe((res) => {
      this.closeModal(res);
    });
  }

  closeModal(data: IPaginateList<ProjectInterface> | null) {
    this.modal.destroy(data);
    this.saveForm.reset();
  }

  fetchData() {
    return this.projectService.getById(this.id).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }
}
