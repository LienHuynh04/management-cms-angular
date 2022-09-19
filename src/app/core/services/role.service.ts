import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {IPaginateList, IRole} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<IRole>> {
    return this.apiBase.get(apiEndpoints.role, {
      page: 1
    });
  }

  create(body: IRole) {
    return this.apiBase.post(apiEndpoints.role, {
      ...body
    });
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.role + '/' + id);
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.role + '/' + id);
  }

  update(id: number | string | undefined, body: IRole) {
    return this.apiBase.put(apiEndpoints.role + '/' + id, {
      ...body
    });
  }
}
