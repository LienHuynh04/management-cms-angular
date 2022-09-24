import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CustomerInterface, IPaginateList } from '../../../core/interfaces';
import { StaffService, TeamService } from '../../../core/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private teamService: TeamService,
    private staffService: StaffService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<CustomerInterface>> | boolean | any {
    return forkJoin([this.teamService.getAll(), this.staffService.getAll()]).pipe(
      map(resp => {
        return {
          data: resp[0].data,
          pagination: resp[0].pagination,
          leader: resp[1].data
        }
      })
    )
  }
}
