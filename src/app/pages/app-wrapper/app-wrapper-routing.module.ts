import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppWrapperComponent } from './app-wrapper.component';
import { ProfileComponent } from '../../modules/profile/profile.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ROLE_CONFIG } from '../../config/role-config';

const routes: Routes = [
  {
    path: '',
    component: AppWrapperComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'customers',
        loadChildren: () => import('../../modules/customer/customer.module').then(m => m.CustomerModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('customers'),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: 'staff',
        loadChildren: () => import('../../modules/staff/staff.module').then(m => m.StaffModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('staff')?.concat(['marketing', 'sales', 'sales-manager']),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: 'project',
        loadChildren: () => import('../../modules/project/project.module').then(m => m.ProjectModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('project'),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: 'care',
        loadChildren: () => import('../../modules/care/care.module').then(m => m.CustomerCareModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('../../modules/role/role.module').then(m => m.RoleModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('roles'),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: 'teams',
        loadChildren: () => import('../../modules/team/team.module').then(m => m.TeamModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('admin'),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: 'project-new',
        loadChildren: () => import('../../modules/project-new/project-new.module').then(m => m.ProjectNewModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ROLE_CONFIG.get('project-new'),
            redirectTo: 'dashboard'
          }
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppWrapperRoutingModule {
}
