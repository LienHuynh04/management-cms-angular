import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AuthenticationService, StaffService, TeamService } from '../../../core/services';
import { map } from 'rxjs/operators';
import { RoleService } from '../../../core/services/role.service';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private roleService: RoleService,
    private staffService: StaffService,
    private authService: AuthenticationService,
    public router: Router,
    private teamService: TeamService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.roleService.getAll(), this.teamService.getAll()];
    if (route.params.id) {
      source$.push(this.staffService.getById(route.params.id));
    }
    if ((this.authService.currentUserValue.id == route.params.id || route.params.id == 1)) {
      this.router.navigate(['users']);
    }
    return forkJoin(source$).pipe(
      map((resp) => {
        return {
          roles: resp[0]?.data,
          teams: resp[1]?.data,
          data: resp[2]?.data,
        };
      })
    );
  }
}
