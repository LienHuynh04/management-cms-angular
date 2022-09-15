import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerService, ProjectService} from '../../../core/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private projectService: ProjectService,
    private customerService: CustomerService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.projectService.getAll()]
    if(route.params.id) {
      source$.push(this.customerService.getById(route.params.id))
    }
    return forkJoin(source$).pipe(
      map((resp) => {
        return  {
          customerProject: resp[0]?.data,
          data: resp[1]?.data
        }
      })
    )
  }
}
