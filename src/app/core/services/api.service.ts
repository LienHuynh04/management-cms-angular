import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiBase {
  constructor(private http: HttpClient) {
  }

  getCsv(path: string, params: any | HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiDomain}${environment.apiRoute}${path}`, {params, responseType: 'arraybuffer'});
  }

  get(path: string, params: any | HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiDomain}${environment.apiRoute}${path}`, {params});
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiDomain}${environment.apiRoute}${path}`, body);
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http
      .patch(`${environment.apiDomain}${environment.apiRoute}${path}`, body);
  }

  post(path: string, body: object = {}): Observable<any> {
    const httpOptions = {};
    return this.http
      .post(`${environment.apiDomain}${environment.apiRoute}${path}`, body, {
        ...httpOptions,
        reportProgress: true
      }).pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }

  delete(path: string, params: any | HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .delete(`${environment.apiDomain}${environment.apiRoute}${path}`, {params});
  }

  request(request: HttpRequest<any>): Observable<any> {
    return this.http.request(request);
  }
}
