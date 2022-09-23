import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SaveResolver } from './save/save.resolver';
import { ListResolver } from './list/list.resolver';

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
    }
  },
  {
    path: 'update/:id',
    component: SaveComponent,
    resolve: {
      resolvedData: SaveResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {
}
