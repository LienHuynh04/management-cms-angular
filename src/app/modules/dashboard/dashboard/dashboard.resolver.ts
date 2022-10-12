import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { DashboardService } from '../../../core/services/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<boolean> {
  constructor(
    private dashboardService: DashboardService,
    public permissionService: NgxPermissionsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const api = [this.dashboardService.getStatistic()];
    if (this.permissionService.getPermission('admin')) {
      api.push(this.dashboardService.getFieldStatisticAdmin());
    }
    return forkJoin(api).pipe(
      map((resp: any) => {
        return {
          data: resp[0],
          selectStaticAdmin: resp[1]
        };
      })
    );
  }
}
