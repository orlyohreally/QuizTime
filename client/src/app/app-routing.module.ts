import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LandingPageComponent }   from './landing-page/landing-page.component';
import { SearchQuizPageComponent }   from './search-quiz-page/search-quiz-page.component';
import { MyQuizzesPageComponent }   from './my-quizzes-page/my-quizzes-page.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'quizzes', component: SearchQuizPageComponent },
  { path: 'my-quizzes', component: MyQuizzesPageComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}