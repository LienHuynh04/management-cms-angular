import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {CustomerCareInterface, CustomerInterface, IPaginateList} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerCareService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<CustomerCareInterface>> {
    return this.apiBase.get(apiEndpoints.customer, {
      page: 1,
      per_page: 10
    });
  }

  create(body: CustomerCareInterface) {
    return this.apiBase.post(apiEndpoints.customer, {
      ...body
    })
  }

  getById(id: number) {
    return this.apiBase.get(apiEndpoints.customer + '/' + id);
  }

  delete(id: number) {
    return this.apiBase.delete(apiEndpoints.customer + '/' + id)
  }
  update(id: number, body: CustomerCareInterface) {
    return this.apiBase.put(apiEndpoints.customer + '/' + id, {
      ...body
    })
  }
}
