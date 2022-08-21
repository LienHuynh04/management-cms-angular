import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, switchMap, tap} from 'rxjs/operators';

// Plugins
import {NgxPermissionsService} from 'ngx-permissions';

// Core Module
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {TokenService} from './token.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;
  private sessionName = 'management';
  returnUrl: string;

  constructor(
    private apiBase: ApiBase,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngxPermissionsService: NgxPermissionsService,
    private tokenService: TokenService
  ) {
    const user = this.readUserData();
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';

    // Load permission
    if (user && user.roles) {
      this.ngxPermissionsService.flushPermissions();
      this.ngxPermissionsService.loadPermissions([user.roles[0]]);
    }
  }

  readUserData(): any {
    const userData: any = sessionStorage.getItem(this.sessionName) || localStorage.getItem(this.sessionName);
    return JSON.parse(userData);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, rememberMe?: false): Observable<any> {
    return this.apiBase.post(apiEndpoints.login, {login_id: username, password}).pipe(
      tap(({access_token}) => {
        if (access_token) {
          this.tokenService.accessToken = access_token;
        }
      }), switchMap(resp => {
        return this.profile();
      }));
  }

  profile(): any {
    return this.apiBase.get(apiEndpoints.profile, {
      include: 'roles'
    })
      .pipe(
        finalize(() => {
          this.currentUserValue
            ? this.router.navigate([''])
            : this.router.navigate(['login']);
        }),
        tap(({data}) => {
          this.currentUserSubject.next(data);
          // Load permission
          this.ngxPermissionsService.flushPermissions();
          this.ngxPermissionsService.loadPermissions([data?.roles[0].name]);
        }));
  }

  logout(): void {
    this.apiBase.delete(apiEndpoints.logout)
      .pipe(finalize(() => {
        this.tokenService.clearToken();
        this.router.navigate(['login'])
      })).subscribe();
  }

}
