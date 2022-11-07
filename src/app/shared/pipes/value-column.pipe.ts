import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueColumn'
})
export class ValueColumnPipe implements PipeTransform {

  transform(value: any, child ?: string): unknown {
    if(value && child) {
      return value[child]
    }
    return value;
  }

}
