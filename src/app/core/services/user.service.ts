import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {IPaginateList} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<any>> {
    return this.apiBase.get(apiEndpoints.user, {
      page: 1,
      per_page: 10
    });
  }

  createUser(body: any) {
    return this.apiBase.post(apiEndpoints.user, {
      ...body
    })
  }

  getById(id: number) {
    return this.apiBase.get(apiEndpoints.user + '/' + id);
  }

  delete(id: number) {
    return this.apiBase.delete(apiEndpoints.user + '/' + id)
  }
  update(id: number, body: any) {
    return this.apiBase.put(apiEndpoints.user + '/' + id, {
      ...body
    })
  }
}
