import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiBase } from '../../../core/services';
import { apiEndpoints } from '../../../config/global-vars';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<boolean> {
  constructor(
    private apiBase: ApiBase
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.apiBase.post(apiEndpoints.statistics).pipe(
      map(resp => {
        return resp.data
      })
    )
  }
}
