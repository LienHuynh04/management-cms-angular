import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {CustomerInterface, IPaginateList} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<CustomerInterface>> {
    return this.apiBase.get(apiEndpoints.customer, {
      page: 1,
      per_page: 10
    });
  }

  createCustomer(body: CustomerInterface) {
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
  update(id: number, body: any) {
    return this.apiBase.put(apiEndpoints.customer + '/' + id, {
      ...body
    })
  }
}
