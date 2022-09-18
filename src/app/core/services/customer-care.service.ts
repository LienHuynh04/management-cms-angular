import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {CustomerCareInterface, IPaginateList} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerCareService {

  constructor(
    private apiBase: ApiBase
  ) { }

  getAll(): Observable<IPaginateList<CustomerCareInterface>> {
    return this.apiBase.get(apiEndpoints.customer_care, {
      page: 1,
      per_page: 10
    });
  }

  create(body: CustomerCareInterface) {
    return this.apiBase.post(apiEndpoints.customer_care, {
      ...body
    })
  }

  getById(id: number | string | undefined) {
    return this.apiBase.get(apiEndpoints.customer_care + '/' + id);
  }

  delete(id: number | string | undefined) {
    return this.apiBase.delete(apiEndpoints.customer_care + '/' + id);
  }

  update(id: number | string | undefined, body: CustomerCareInterface) {
    return this.apiBase.put(apiEndpoints.customer_care + '/' + id, {
      ...body
    })
  }
}
