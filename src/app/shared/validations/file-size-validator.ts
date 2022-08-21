import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(options: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const fileSize = file.size;
      const fileType = file.type;
      const fileSizeInKB = Math.round(fileSize / 1024 / 1024);
      if (fileSizeInKB > options?.max_file_size || !['image/gif', 'image/jpeg', 'image/png'].includes(fileType)) {
        return {
          fileSizeValidator: true
        };
      } else {
        return null;
      }
    }
    return null;
  }
}
