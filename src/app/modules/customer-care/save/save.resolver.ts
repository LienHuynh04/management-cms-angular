import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerCareService, CustomerService, ProjectService} from '../../../core/services';
import {UserService} from '../../../core/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveResolver implements Resolve<boolean> {
  constructor(
    private careService: CustomerCareService,
    private userService: UserService,
    private customerService: CustomerService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const source$ = [this.customerService.getAll(), this.userService.getAll()]
    if (route.params.id) {
      source$.push(this.careService.getById(route.params.id));
    }
    return forkJoin(source$).pipe(
      map(res => {
        return {
          customer: res[0]?.data,
          user: res[1]?.data,
          data: res[2]?.data
        }
      })
    )
  }
}
