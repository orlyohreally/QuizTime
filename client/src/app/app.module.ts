import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import {RlTagInputModule} from 'angular2-tag-input';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AuthErrorHandler } from './auth.error-handler';

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
import { TestFormComponent } from './test-form/test-form.component';

import { ModalService } from './modal.service';
import { ModalDirective } from './modal.directive';
import { ModalComponent } from './modal/modal.component';
import { SearchQuizPageComponent } from './search-quiz-page/search-quiz-page.component';
import { MyQuizzesPageComponent } from './my-quizzes-page/my-quizzes-page.component';

import { FooterComponent } from './footer/footer.component';

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
    TestFormComponent,
    SearchQuizPageComponent,
    MyQuizzesPageComponent,
    FooterComponent,
  ],
  entryComponents:[
    LoginFormComponent,
    TestFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    Select2Module,
    RlTagInputModule,
  ],
  providers: [
    TestService,
    ModalService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
    AuthErrorHandler,
    {
        provide: ErrorHandler,
        useClass: AuthErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
