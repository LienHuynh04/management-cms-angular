import {Component, Inject, OnInit} from '@angular/core';
import {NavbarItem, NAVIGATIONS} from '../../core/interfaces/navigation';
import {AuthenticationService} from '../../core/services/authentication.service';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {
  isCollapsed = false;
  constructor(
    @Inject(NAVIGATIONS)
    public navigations: NavbarItem[],
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
