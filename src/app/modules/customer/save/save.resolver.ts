import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CustomerService, ProjectService, StaffService } from '../../../core/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private projectService: ProjectService,
    private customerService: CustomerService,
    private staffService: StaffService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [
      this.projectService.getAll({'filter[type_project]': 0}),
      this.projectService.getAll({'filter[type_project]': 1}),
      this.staffService.getAll({
      'filter[sales]': 1
    })];
    if (route.params.id) {
      source$.push(this.customerService.getById(route.params.id));
    }
    return forkJoin(source$).pipe(
      map((resp) => {
        return {
          projects: resp[0]?.data,
          projects_new: resp[1]?.data,
          users: resp[2]?.data,
          data: resp[3]?.data
        };
      })
    );
  }
}
