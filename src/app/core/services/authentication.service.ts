import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize, map, switchMap, tap} from 'rxjs/operators';

// Plugins
import {NgxPermissionsService} from 'ngx-permissions';

// Core Module
import {ApiBase} from './api.service';
import {apiEndpoints} from '../../config/global-vars';
import {CredentialsService} from './credentials.service';
import {IAdmin} from '../interfaces';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  private sessionName = 'management';
  returnUrl: string;

  constructor(
    private apiBase: ApiBase,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngxPermissionsService: NgxPermissionsService,
    private credentialsService: CredentialsService
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
      tap((user) => {
        if (user) {
          const { data } = user;
          this.currentUserSubject.next(data.user);
          this.credentialsService.setCredentials(
            { access_token: data.access_token },
            rememberMe
          );
        }
      }),
      switchMap((resp) => {
        return this.profile().pipe(
          finalize(() => {
            this.router.navigate(['/customers']);
          })
        );
      })
    );
  }

  profile(): any {
    return this.apiBase
      .get(apiEndpoints.profile, {
        with: 'roles.permissions',
      })
      .pipe(
        map((resp) => {
          const user: IAdmin = this.currentUserValue || {};
          Object.assign(user, resp.data);
          this.currentUserSubject.next(user);

          // Load permission
          this.ngxPermissionsService.flushPermissions();
          this.ngxPermissionsService.loadPermissions(
            user.role.map((per: any) => {
              return per.name;
            })
          );
          return true;
        }),
        catchError((err) => {
          this.router.navigateByUrl('404');
          return of(false);
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): void {
    this.apiBase
      .delete(apiEndpoints.logout)
      .pipe(
        finalize(() => {
         this.clearAndLogout()
        })
      )
      .subscribe();
  }


  clearAndLogout(): void {
    this.credentialsService.setCredentials();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
