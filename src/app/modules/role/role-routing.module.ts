import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {ListResolver} from './list/list.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolvedData: ListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}
