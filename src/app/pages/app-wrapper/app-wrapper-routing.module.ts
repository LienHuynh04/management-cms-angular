import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppWrapperComponent} from './app-wrapper.component';
import {AuthGuard} from '../../core/guards';
import {ProfileComponent} from '../../modules/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppWrapperComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'customers',
        loadChildren: () => import('../../modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('../../modules/staff/staff.module').then(m => m.StaffModule)
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
        path: 'teams',
        loadChildren: () => import('../../modules/team/team.module').then(m => m.TeamModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppWrapperRoutingModule { }
