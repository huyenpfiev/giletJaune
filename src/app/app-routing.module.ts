
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { InfoGetComponent } from './info-get/info-get.component';
import {FriendDeleteComponent} from './friend-delete/friend-delete.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { AuthGuardService } from './service/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'friend/add',
    component: FriendAddComponent
  },
  
  {
    path: 'info/edit',
    component: InfoEditComponent
  },
  {
    path: 'infos',
    component: InfoGetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'friend/delete',
    component: FriendDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }