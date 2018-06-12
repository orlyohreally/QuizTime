import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { ModalService } from './modal.service';
import { ModalDirective } from './modal.directive';
import { ModalComponent } from './modal/modal.component';
import { SearchQuizePageComponent } from './search-quize-page/search-quize-page.component';
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LandingPageComponent,
    QuizTimeDescriptionComponent,
    StepsComponent,
    TopicsComponent,
    ModalDirective,
    ModalComponent,
    LoginFormComponent,
    SearchQuizePageComponent
  ],
  entryComponents:[
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TestService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
