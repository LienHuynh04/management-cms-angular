import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoadingOverlayService } from '../../core/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export abstract class BaseForm<T> {
  resolvedData;
  record: T;
  saveForm!: FormGroup;
  isLoading = false;

  protected constructor(
    protected modalSerice: NzModalService,
    protected loadingOverlayService: LoadingOverlayService,
    protected notification: NzNotificationService,
    protected activatedRouteBase?: ActivatedRoute,
    protected routerBase?: Router
  ) {
    this.resolvedData = this.activatedRouteBase?.snapshot?.data?.resolvedData;
    this.record = this.resolvedData?.data;
    this.loadingOverlayService.isLoading$
      .pipe(delay(0))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  /*Process Data*/
  processData(request: Observable<any>, redirectUrl ?: string): void {
    request
      .pipe(
        catchError((error: HttpErrorResponse | any) => {
          this.notification.create(
            'error',
            'Thất bại',
            '',
            { nzDuration: 1500 }
          );
          if (error.status === 422) {
            this.setFormErrors(error.error.errors);
          }
          return throwError(error);
        })
      )
      .subscribe(resp => {
        this.record = resp;
        if (redirectUrl) this.routerBase?.navigate([redirectUrl]);
        this.notification.create(
          'success',
          'Thành công',
          '',
          { nzDuration: 1500 }
        );
      });
  }


  /*End - Convert data*/

  deleteItem(id: string): void {
  }

  field(name: string) {
    return this.saveForm.get(`${name}`) as FormGroup;
  }

  /*End - Process Data*/

  valueForm(name: string) {
    return this.field(name).value;
  }

  validationForm(): void {
    for (const item in this.saveForm.controls) {
      this.saveForm.controls[item].markAsDirty();
      this.saveForm.controls[item].updateValueAndValidity();
    }

    if (this.saveForm.invalid) {
      // tslint:disable-next-line:forin
      this.saveForm.markAllAsTouched();
      return;
    }
    this.submitForm();
  }

  protected patchValueForm() {
    if (this.record) {
      this.saveForm.patchValue(this.record);
    }
  }

  /*Convert data*/
  protected processBody(): {} {
    const body = {};
    return body;
  }

  protected submitForm() {
  }

  setFormErrors(errors: any): void {
    Object.keys(errors).forEach((key: string) => {
      this.saveForm.get(key)?.setErrors({
        taken: errors[key][0]
      });
    });
    this.saveForm.markAllAsTouched();
  }


  /*End - Handle Form*/
  confirmUpdate() {
    this.modalSerice.confirm({
      nzTitle: this.record ? 'Bạn có muốn thay đổi ?' : 'Bạn có muốn tạo mới ?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzStyle: {
        top: '30%'
      },
      nzCancelText: 'Không',
      nzOnOk: () => this.validationForm(),
    });
  }
}
