import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/app-wrapper/app-wrapper.module').then(m => m.AppWrapperModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
