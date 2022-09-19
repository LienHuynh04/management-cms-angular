import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {TeamService, UserService} from '../../../core/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    public router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.userService.getAll()];
    if (route.params.id) {
      source$.push(this.teamService.getById(route.params.id));
    }

    return forkJoin(source$).pipe(
      map((resp) => {
        return {
          users: resp[0]?.data,
          data: resp[1]?.data,
        };
      })
    );
  }
}
