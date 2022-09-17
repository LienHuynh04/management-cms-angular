import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {IPaginateList, UserInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<UserInterface>> {
    return this.apiBase.get(apiEndpoints.role, {
      page: 1,
      per_page: 10
    });
  }

  create(body: UserInterface) {
    return this.apiBase.post(apiEndpoints.role, {
      ...body
    });
  }

  getById(id: number) {
    return this.apiBase.get(apiEndpoints.role + '/' + id);
  }

  delete(id: number) {
    return this.apiBase.delete(apiEndpoints.role + '/' + id);
  }

  update(id: number, body: UserInterface) {
    return this.apiBase.put(apiEndpoints.role + '/' + id, {
      ...body
    });
  }
}
