import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { QuizTimeDescriptionComponent } from './quiz-time-description/quiz-time-description.component';
import { StepsComponent } from './steps/steps.component';
import { TopicsComponent } from './topics/topics.component';
import { TestService } from './test.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LandingPageComponent,
    QuizTimeDescriptionComponent,
    StepsComponent,
    TopicsComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
