import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {AuthenticationService, UserService} from '../../../core/services';
import {map} from 'rxjs/operators';
import {RoleService} from '../../../core/services/role.service';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthenticationService,
    public router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.roleService.getAll()];
    if (route.params.id) {
      source$.push(this.userService.getById(route.params.id));
    }
    if ((this.authService.currentUserValue.id == route.params.id || route.params.id == 1)) {
      this.router.navigate(['users'])
    }
    return forkJoin(source$).pipe(
      map((resp) => {
        return {
          roles: resp[0]?.data,
          data: resp[1]?.data,
        };
      })
    );
  }
}
