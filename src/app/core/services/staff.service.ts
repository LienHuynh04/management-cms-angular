import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './api.service';
import { apiEndpoints } from '../../config/global-vars';
import { IPaginateList, StaffInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(params ?: any): Observable<IPaginateList<StaffInterface>> {
    return this.apiBase.get(apiEndpoints.user, {
      page: 1,
      per_page: 50,
      with: 'team',
      ...params
    });
  }

  create(body: StaffInterface) {
    return this.apiBase.post(apiEndpoints.user, {
      ...body
    });
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.user + '/' + id);
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.user + '/' + id);
  }

  update(id: number | string | undefined, body: StaffInterface) {
    return this.apiBase.put(apiEndpoints.user + '/' + id, {
      ...body
    });
  }

  updateProfile(body: StaffInterface) {
    return this.apiBase.put(apiEndpoints.profile_update, body);
  }
}
