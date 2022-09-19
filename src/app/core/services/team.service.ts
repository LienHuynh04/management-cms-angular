import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {IPaginateList} from '../interfaces';
import {TeamInterface} from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(params ?: any): Observable<IPaginateList<TeamInterface>> {
    return this.apiBase.get(apiEndpoints.team, {
      page: 1,
      per_page: 50,
      with: 'leader',
      ...params
    });
  }

  create(body: TeamInterface) {
    return this.apiBase.post(apiEndpoints.team, {
      ...body
    });
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.team + '/' + id);
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.team + '/' + id);
  }

  update(id: number | string | undefined, body: TeamInterface) {
    return this.apiBase.put(apiEndpoints.team + '/' + id, {
      ...body
    });
  }
}
