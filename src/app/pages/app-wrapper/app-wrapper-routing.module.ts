import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'user',
        loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule)
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
