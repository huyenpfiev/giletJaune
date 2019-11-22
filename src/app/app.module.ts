import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoGetComponent } from './info-get/info-get.component';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { FriendDeleteComponent } from './friend-delete/friend-delete.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './service/authentication.service'
import { AuthGuardService } from './service/auth-guard.service';

import { AddFriendComponent } from './add-friend/add-friend.component'
@NgModule({
  declarations: [
    AppComponent,
    InfoGetComponent,
    InfoEditComponent,
    FriendAddComponent,
    FriendDeleteComponent,
    
    LoginComponent,
    RegisterComponent,
   
    AddFriendComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
