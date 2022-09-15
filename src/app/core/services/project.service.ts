import { Injectable } from '@angular/core';
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
  ) { }

  getAll(): Observable<IPaginateList<CustomerInterface>> {
    return this.apiBase.get(apiEndpoints.project, {
      page: 1,
      per_page: 10
    });
  }
}
