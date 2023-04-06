import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MentorsComponent} from "./mentors/mentors.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {BecomeMentorComponent} from "./become-mentor/become-mentor.component";
import {LearnerComponent} from "./learner/learner.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createAccount', component: CreateAccountComponent},
  {path: 'mentors', component: MentorsComponent},
  {path: 'learner/:userId', component: LearnerComponent},
  {path: 'profile', component: BecomeMentorComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
