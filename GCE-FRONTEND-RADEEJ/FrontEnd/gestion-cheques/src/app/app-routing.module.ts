import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/connexion/login/login.component';
import { RegisterComponent } from './components/connexion/register/register.component';
import { SidebarComponent } from './components/hero/sidebar/sidebar.component';
import { DashboardComponent } from './components/hero/dashboard/dashboard.component';
import { ClientComponent } from './components/contants/clients/client/client.component';
import { ChequeComponent } from './components/contants/chéques/cheque/cheque.component';
import { ConsulterComponent } from './components/contants/consulter/consulter.component';
import { JschequeComponent } from './components/contants/JSChéques/jscheque/jscheque.component';
import { SJCChequeComponent } from './components/contants/SJCChéques/sjccheque/sjccheque.component';
import { NotFoundComponent } from './components/hero/notfound/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/connexion/forgotPassword/forgot-password/forgot-password.component';
import { PermissionPageComponent } from './components/connexion/PermissionPage/permission-page/permission-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Permission', component: PermissionPageComponent },
  {
    path: 'sidebar',
    component: SidebarComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'cheques', component: ChequeComponent },
      { path: 'consulter', component: ConsulterComponent },
      { path: 'SJcheques', component: JschequeComponent },
      { path: 'SJCcheques', component: SJCChequeComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
