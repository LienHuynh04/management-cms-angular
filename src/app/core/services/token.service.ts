import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  get accessToken(): any {
    return sessionStorage.getItem('access_token');
  }

  set accessToken(token: any) {
    sessionStorage.setItem('access_token', token);
  }

  clearToken() {
    sessionStorage.removeItem('access_token');
  }
}
