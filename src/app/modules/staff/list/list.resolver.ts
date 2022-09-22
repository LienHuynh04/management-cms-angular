import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerInterface, IPaginateList} from '../../../core/interfaces';
import {StaffService} from '../../../core/services/staff.service';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private staffService: StaffService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CustomerInterface>> | boolean | any {
    return this.staffService.getAll()
  }
}
