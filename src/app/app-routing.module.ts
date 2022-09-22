import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard, LoginGuard} from './core/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/app-wrapper/app-wrapper.module').then(m => m.AppWrapperModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
