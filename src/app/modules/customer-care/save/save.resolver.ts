import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProjectService} from '../../../core/services';
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
    if (route.params.id) {
      return this.userService.getById(route.params.id);
    }
    return of([]);
  }
}
