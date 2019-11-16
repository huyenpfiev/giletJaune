import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoGetComponent } from './info-get/info-get.component';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { FriendDeleteComponent } from './friend-delete/friend-delete.component';
import { FriendGetComponent } from './friend-get/friend-get.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { InfosService } from './service/infos.service';
import { AlertService } from './service/alert.service';
@NgModule({
  declarations: [
    AppComponent,
    InfoGetComponent,
    InfoEditComponent,
    FriendAddComponent,
    FriendDeleteComponent,
    FriendGetComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    InfosService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
