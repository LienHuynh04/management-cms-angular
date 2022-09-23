import { Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ERROR_MESSAGE } from '../../../config/error-messgae';

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.scss'],
})
export class ControlErrorsComponent {
  @Input() fieldName!: string | number | string[] | undefined;

  constructor(
    private rootFormGroup: FormGroupDirective,
  ) {
  }

  get formField(): FormControl | any {
    return this.rootFormGroup.control.get(this.fieldName?.toString() as string) as FormControl;
  }

  listOfErrors(): string[] {
    return Object.keys(this.formField?.errors as any).map(
      err => ERROR_MESSAGE[err](this.formField?.getError(err))
    );
  }
}
