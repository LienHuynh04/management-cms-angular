import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './api.service';
import { apiEndpoints } from '../../config/global-vars';
import { CustomerInterface, IPaginateList } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(params ?: any): Observable<IPaginateList<CustomerInterface>> {
    return this.apiBase.get(apiEndpoints.customer, {
      page: 1,
      per_page: 50,
      ...params
    });
  }

  create(body: CustomerInterface) {
    return this.apiBase.post(apiEndpoints.customer, {
      ...body
    });
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.customer + '/' + id);
  }

  update(id: number | string | undefined, body: CustomerInterface | { assign_for_user_id: number }) {
    return this.apiBase.put(apiEndpoints.customer + '/' + id, {
      ...body
    });
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.customer + '/' + id);
  }
}
