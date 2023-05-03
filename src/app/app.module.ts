import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthService} from "./service/auth/auth-service.service";
import {LoginService} from "./service/login/login.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MentorsComponent} from './mentors/mentors.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {MatSelectModule} from "@angular/material/select";
import {CustomHttpInterceptor} from "./providers/http-interceptor";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {MentorsService} from "./service/mentors/mentors.service";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from '@angular/material/list';
import {ToastModule} from "primeng/toast";
import {BecomeMentorComponent} from './become-mentor/become-mentor.component';
import {UserService} from "./service/user/user.service";
import {MatMenuModule} from "@angular/material/menu";
import {LearnerComponent} from './learner/learner.component';
import {WelcomeKitComponent} from './welcome-kit/welcome-kit.component';
import {BarChartComponent} from "./barchart/barchart";
import {VideoComponent} from './video/video.component';
import {KnowledgeComponent} from './knowledge/knowledge.component';
import {NgChartsModule} from "ng2-charts";
import {NgxSpinnerModule} from "ngx-spinner";
import {DialogComponent} from './dialog/dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MentorsComponent,
    CreateAccountComponent,
    BecomeMentorComponent,
    LearnerComponent,
    WelcomeKitComponent,
    BarChartComponent,
    VideoComponent,
    KnowledgeComponent,
    DialogComponent
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
    MatIconModule,
    MatGridListModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    ToastModule,
    MatMenuModule,
    NgChartsModule,
    MatTooltipModule
  ],
  providers: [AuthService, LoginService, MentorsService, UserService, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
