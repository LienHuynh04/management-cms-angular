import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

export abstract class BaseForm {
  record!: any;
  saveForm!: FormGroup;

  protected constructor(
    protected activatedRouteBase?: ActivatedRoute,
    protected routerBase?: Router
  ) {
    const resolvedData = this.activatedRouteBase?.snapshot?.data?.resolvedData;
    this.record = resolvedData?.data;
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

  /*Convert data*/
  protected processBody(): {} {
    const body = {};
    return body;
  }

  protected submitForm() {
  }

  /*End - Handle Form*/
}
