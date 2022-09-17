import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

export abstract class BaseForm<T> {
  resolvedData;
  record: T;
  saveForm!: FormGroup;

  protected constructor(
    protected activatedRouteBase?: ActivatedRoute,
    protected routerBase?: Router
  ) {
    this.resolvedData = this.activatedRouteBase?.snapshot?.data?.resolvedData;
    this.record = this.resolvedData?.data;
  }

  /*Process Data*/
  processData(request: Observable<any>, redirectUrl ?: string): void {
    request
      .pipe(
        catchError((error: HttpErrorResponse | any) => {
          return throwError(error);
        })
      )
      .subscribe(resp => {
        this.record = resp;
        if(redirectUrl) this.routerBase?.navigate([redirectUrl])
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
    if(this.record) {
      this.saveForm.patchValue(this.record)
    }
  }

  /*Convert data*/
  protected processBody(): {} {
    const body = {};
    return body;
  }

  protected submitForm() {
  }

  /*End - Handle Form*/
}
