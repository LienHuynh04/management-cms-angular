import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {CustomerService, UserService} from '../../../core/services';
import {IPaginateList} from '../../../core/interfaces';
import {CustomerInterface} from '../../../core/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private customerService: CustomerService,
    protected userService: UserService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CustomerInterface>> | boolean | any {

   return forkJoin([this.customerService.getAll(), this.userService.getAll({
      'filter[sales] ': 1
    })]).pipe(
      map(res => {
        return {
          data: res[0].data,
          pagination: res[0].pagination,
          staff: res[1].data
        }
      })
    )
  }
}
