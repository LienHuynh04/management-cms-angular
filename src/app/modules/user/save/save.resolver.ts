import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerService, ProjectService} from '../../../core/services';
import {map} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if(route.params.id) {
     return this.userService.getById(route.params.id)
    }
    return of([])
  }
}
