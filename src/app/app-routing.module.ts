import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AccountComponent } from './account/account.component'
import { SzkoleniaComponent } from './szkolenia/szkolenia.component'
import { AuthGuard } from './_helpers';
import { ListSzkoleniaComponent } from './list-szkolenia/list-szkolenia.component';
import { UserManagComponent } from './user-manag/user-manag.component';
import { EditUserManagComponent } from './edit-user-manag/edit-user-manag.component';
const routes: Routes = [
  { path: 'log', component: LoginComponent },
  { path: 'reg', component: RegisterComponent },
  { path: 'acc', component: AccountComponent },
  { path: 'szkolenia', component: SzkoleniaComponent },
  { path: 'lista', component: ListSzkoleniaComponent },
  { path: 'users', component: UserManagComponent,
    children: [
      { path: 'edituser/:id', component: EditUserManagComponent },
    ]
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
