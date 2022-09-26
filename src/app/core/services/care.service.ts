import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './api.service';
import { apiEndpoints } from '../../config/global-vars';
import { CareInterface, IPaginateList } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CareService {

  constructor(
    private apiBase: ApiBase
  ) {
  }

  getAll(customer: number, params ?: any): Observable<IPaginateList<CareInterface>> {
    return this.apiBase.get(`${apiEndpoints.customer}/${customer}/cares`, {
      page: 1,
      per_page: 5000,
      ...params
    });
  }

  create(customer: number, body: CareInterface) {
    return this.apiBase.post(`${apiEndpoints.customer}/${customer}/cares`, {
      ...body
    });
  }

  // tslint:disable-next-line:typedef
  getById(customer: number, id: number | string | undefined) {
    return this.apiBase.get(`${apiEndpoints.customer}/${customer}/cares/${id}`);
  }

  // tslint:disable-next-line:typedef
  delete(customer: number, id: number | string | undefined) {
    return this.apiBase.delete(`${apiEndpoints.customer}/${customer}/cares/${id}`);
  }

  // tslint:disable-next-line:typedef
  update(customer: number, id: number | string | undefined, body: CareInterface) {
    return this.apiBase.put(`${apiEndpoints.customer}/${customer}/cares/${id}`, {
      ...body
    });
  }
}
