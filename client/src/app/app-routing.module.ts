import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LandingPageComponent }   from './landing-page/landing-page.component';
import { MainMenuComponent }   from './main-menu/main-menu.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'quizzes', component: MainMenuComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}