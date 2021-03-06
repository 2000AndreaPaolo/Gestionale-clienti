import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfiloComponent } from './profilo/profilo.component';
import { NoteComponent } from './note/note.component';
import { PesoComponent } from './peso/peso.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProgrammaCompletoComponent } from './programma-completo/programma-completo.component';
const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard] },
  { path: 'programma', component:ProgrammaCompletoComponent, canActivate: [AuthGuard] },
  { path: 'profilo', component:ProfiloComponent, canActivate: [AuthGuard] },
  { path: 'note', component:NoteComponent, canActivate: [AuthGuard] },
  { path: 'peso', component:PesoComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component:ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
