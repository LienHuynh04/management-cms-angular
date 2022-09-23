import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CareService, CustomerService, StaffService } from '../../../core/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private careService: CareService,
    private staffService: StaffService,
    private customerService: CustomerService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.customerService.getAll(), this.staffService.getAll()];
    if (route.params.id) {
      // source$.push(this.careService.getById(route.params.id));
    }
    return forkJoin(source$).pipe(
      map(res => {
        return {
          customer: res[0]?.data,
          user: res[1]?.data,
          data: res[2]?.data
        };
      })
    );
  }
}
