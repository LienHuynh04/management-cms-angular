import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './api.service';
import { apiEndpoints } from '../../config/global-vars';
import { IPaginateList, ProjectInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(params ?: any): Observable<IPaginateList<ProjectInterface>> {
    return this.apiBase.get(apiEndpoints.project, {
      page: 1,
      per_page: 50,
      ...params
    });
  }

  create(body: ProjectInterface) {
    return this.apiBase.post(apiEndpoints.project, {
      ...body
    });
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.project + '/' + id);
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.project + '/' + id);
  }

  update(id: number | string | undefined, body: ProjectInterface) {
    return this.apiBase.put(apiEndpoints.project + '/' + id, {
      ...body
    });
  }
}
