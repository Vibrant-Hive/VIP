import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthService} from "./service/auth/auth-service.service";
import {LoginService} from "./service/login/login.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatSelectModule} from "@angular/material/select";
import {NgxSpinnerModule} from "ngx-spinner";
import {CustomHttpInterceptor} from "./providers/http-interceptor";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatIconModule
  ],
  providers: [AuthService, LoginService, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
