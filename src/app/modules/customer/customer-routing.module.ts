import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { ListResolver } from './list/list.resolver';
import { SaveResolver } from './save/save.resolver';
import { ROLE_CONFIG } from '../../config/role-config';

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
    data: {
      permissions: {
        only: ROLE_CONFIG.get('customers'),
        redirectTo: 'customers'
      }
    }
  },
  {
    path: 'update/:id',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    },
    data: {
      permissions: {
        only: ROLE_CONFIG.get('customers'),
        redirectTo: 'customers'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
