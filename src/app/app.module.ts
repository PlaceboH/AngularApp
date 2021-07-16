import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { AccountComponent } from './account/account.component';
import { SzkoleniaComponent } from './szkolenia/szkolenia.component';
import { ListSzkoleniaComponent } from './list-szkolenia/list-szkolenia.component';
import { UserManagComponent } from './user-manag/user-manag.component';
import { EditUserManagComponent } from './edit-user-manag/edit-user-manag.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { AddSzkolenieComponent } from './add-szkolenie/add-szkolenie.component';
import { LayerComponent } from './layer/layer.component';
import { MySzkoleniaComponent } from './my-szkolenia/my-szkolenia.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AccountComponent,
    SzkoleniaComponent,
    ListSzkoleniaComponent,
    UserManagComponent,
    EditUserManagComponent,
    CommentsComponent,
    CommentBoxComponent,
    AddSzkolenieComponent,
    LayerComponent,
    MySzkoleniaComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
