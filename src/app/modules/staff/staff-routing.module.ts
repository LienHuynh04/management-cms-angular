import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SaveResolver } from './save/save.resolver';
import { ListResolver } from './list/list.resolver';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolvedData: ListResolver
    }
  },
  {
    path: 'create',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    },
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only:['admin', 'human-resource'],
        redirectTo: 'staff'
      }
    }
  },
  {
    path: 'update/:id',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    },
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only:['admin', 'human-resource'],
        redirectTo: 'staff'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {
}
