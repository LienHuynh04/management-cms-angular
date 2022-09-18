import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppWrapperComponent} from './app-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AppWrapperComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () => import('../../modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'project',
        loadChildren: () => import('../../modules/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'customer-care',
        loadChildren: () => import('../../modules/customer-care/customer-care.module').then(m => m.CustomerCareModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('../../modules/role/role.module').then(m => m.RoleModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customers'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppWrapperRoutingModule { }
