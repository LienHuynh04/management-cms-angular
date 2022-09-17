import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerService, ProjectService} from '../../../core/services';
import {map} from 'rxjs/operators';
import {UserService} from '../../../core/services';
import {RoleService} from '../../../core/services/role.service';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private roleService: RoleService,
    private userService: UserService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.roleService.getAll()]
    if(route.params.id) {
      source$.push(this.userService.getById(route.params.id))
    }
    return forkJoin(source$).pipe(
      map((resp) => {
        return  {
          roles: resp[0]?.data,
          data : resp[1]?.data,
        }
      })
    )
  }
}
