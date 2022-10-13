import { Injectable } from '@angular/core';
import { ApiBase } from './api.service';
import { apiEndpoints } from '../../config/global-vars';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getStatistic() {
    return this.apiBase.post(apiEndpoints.statistics).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }

  getFieldStatisticAdmin() {
    return this.apiBase.get(apiEndpoints.get_field_dashboard_admin).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }

  getStaticDepartmentAdmin(name_department: string) {
    return this.apiBase.get(apiEndpoints.get_statistic_department, {
      name_department: name_department
    }).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }

  getStaticTeamAdmin(team_id: string) {
    return this.apiBase.get(apiEndpoints.get_statistic_team, {
      team_id: team_id
    }).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }
}
