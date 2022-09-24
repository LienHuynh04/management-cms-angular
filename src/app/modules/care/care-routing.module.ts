import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListResolver } from './list/list.resolver';
import { SaveComponent } from './save/save.component';
import { SaveResolver } from './save/save.resolver';

const routes: Routes = [
  {
    path: ':customer',
    component: ListComponent,
    resolve: {
      resolvedData: ListResolver
    }
  },
  {
    path: ':customer/create',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    }
  },
  {
    path: ':customer/update/:id',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/customers'
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareRoutingModule {
}
