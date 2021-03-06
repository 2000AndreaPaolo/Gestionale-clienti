import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { NoteComponent } from './note/note.component';
import { PesoComponent } from './peso/peso.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProgrammaCompletoComponent } from './programma-completo/programma-completo.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MainNavComponent,
    ProfiloComponent,
    NoteComponent,
    PesoComponent,
    ChangePasswordComponent,
    ProgrammaCompletoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbModule,
    CountdownTimerModule.forRoot(),
    NgxPaginationModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
