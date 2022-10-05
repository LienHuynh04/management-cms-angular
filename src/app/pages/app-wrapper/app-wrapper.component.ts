import { Component, Inject, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { NavbarItem, NAVIGATIONS } from '../../core/interfaces';
import { AuthenticationService, LoadingOverlayService } from '../../core/services';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {
  isLoading = false;
  isCollapsed = false;

  constructor(
    @Inject(NAVIGATIONS)
    public navigations: NavbarItem[],
    public authService: AuthenticationService,
    public loadingOverlayService: LoadingOverlayService,
  ) {
    this.loadingOverlayService.isLoading$
      .pipe(delay(0))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  ngOnInit(): void {
  }

  logout(): void {
    return this.authService.logout();
  }

}
