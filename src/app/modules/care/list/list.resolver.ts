import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CareInterface, IPaginateList } from '../../../core/interfaces';
import { CareService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private customerCareService: CareService,
    private router: Router
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CareInterface>> | boolean | any {

    if (!route.params.customer) {
      return this.router.navigate(['/customers']);
    }
    return this.customerCareService.getAll(route.params.customer);
  }
}
