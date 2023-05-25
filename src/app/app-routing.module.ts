import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MentorsComponent} from "./mentors/mentors.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {BecomeMentorComponent} from "./become-mentor/become-mentor.component";
import {LearnerComponent} from "./learner/learner.component";
import {AuthGuard} from "./auth.guard";
import {WelcomeKitComponent} from "./welcome-kit/welcome-kit.component";
import {VideoComponent} from "./video/video.component";
import {KnowledgeComponent} from "./knowledge/knowledge.component";
import {ServicesComponent} from "./services/services.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createAccount', component: CreateAccountComponent},
  {path: 'mentors', component: MentorsComponent},
  {path: 'learner/:userId', component: LearnerComponent},
  {path: 'profile', component: BecomeMentorComponent},
  {path: 'welcome', component: WelcomeKitComponent},
  {path: 'video', component: VideoComponent},
  {path: 'roadmap', component: KnowledgeComponent},
  {path: 'services', component: ServicesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
