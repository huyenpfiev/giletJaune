
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { InfoGetComponent } from './info-get/info-get.component';
import {FriendDeleteComponent} from './friend-delete/friend-delete.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { FriendGetComponent } from './friend-get/friend-get.component';
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
    path: 'friends',
    component: FriendGetComponent
  },
  {
    path: 'edit/:id',
    component: InfoEditComponent
  },
  {
    path: 'infos',
    component: InfoGetComponent
  },
  {
    path: 'delete/:id',
    component: FriendDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }