import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerInterface, IPaginateList} from '../../../core/interfaces';
import {CustomerCareService} from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private customerCareService: CustomerCareService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CustomerInterface>> | boolean | any {
    return this.customerCareService.getAll();
  }
}
