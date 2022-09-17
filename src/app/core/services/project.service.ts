import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {CustomerInterface, IPaginateList} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(): Observable<IPaginateList<CustomerInterface>> {
    return this.apiBase.get(apiEndpoints.project, {
      page: 1,
      per_page: 10
    });
  }

  create(body: any) {
    return this.apiBase.post(apiEndpoints.project, {
      ...body
    });
  }

  getById(id: number) {
    return this.apiBase.get(apiEndpoints.project + '/' + id);
  }

  delete(id: number) {
    return this.apiBase.delete(apiEndpoints.project + '/' + id);
  }

  update(id: number, body: any) {
    return this.apiBase.put(apiEndpoints.project + '/' + id, {
      ...body
    });
  }
}
