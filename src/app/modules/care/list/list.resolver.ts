import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CareInterface, IPaginateList } from '../../../core/interfaces';
import { CareService, CustomerService } from '../../../core/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private customerCareService: CareService,
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CareInterface>> | boolean | any {
    console.log(route.params);
    if (!route.params.customer) {
      return this.router.navigate(['/customers']);
    }
    return forkJoin(
      [
        this.customerCareService.getAll(route.params.customer),
        this.customerService.getById(route.params.customer)
      ]
    ).pipe(
      map(resp => {
        return {
          data: resp[0].data,
          pagination: resp[0].pagination,
          customer: resp[1].data
        }
      })
    )
  }
}
