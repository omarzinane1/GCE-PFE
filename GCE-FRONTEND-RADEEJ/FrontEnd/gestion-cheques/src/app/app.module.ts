import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/connexion/login/login.component';
import { RegisterComponent } from './components/connexion/register/register.component';
import { SidebarComponent } from './components/hero/sidebar/sidebar.component';
import { DashboardComponent } from './components/hero/dashboard/dashboard.component';
import { ClientComponent } from './components/contants/clients/client/client.component';
import { ChequeComponent } from './components/contants/chéques/cheque/cheque.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConsulterComponent } from './components/contants/consulter/consulter.component';
import { JschequeComponent } from './components/contants/JSChéques/jscheque/jscheque.component';
import { SJCChequeComponent } from './components/contants/SJCChéques/sjccheque/sjccheque.component';
import { NotFoundComponent } from './components/hero/notfound/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/connexion/forgotPassword/forgot-password/forgot-password.component';
import { PermissionPageComponent } from './components/connexion/PermissionPage/permission-page/permission-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    DashboardComponent,
    ClientComponent,
    ChequeComponent,
    ConsulterComponent,
    JschequeComponent,
    SJCChequeComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    PermissionPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //JwtModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 4000,
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    toastClass: 'custom-toast', }),
  ],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
