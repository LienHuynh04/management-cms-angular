import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../../../core/services';
import { IPaginateList, ProjectInterface } from '../../../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {
  constructor(
    private projectService: ProjectService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<IPaginateList<ProjectInterface>> | boolean | any {
    return this.projectService.getAll({
      'filter[type_project]': 1
    });

  }
}
