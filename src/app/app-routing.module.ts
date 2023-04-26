import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { CalculatorsPageComponent } from './calculators-page/calculators-page.component';
import { SubmittedComponent } from './submitted/submitted.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'loan', component: LoanFormComponent },
  { path: 'apply', component: ApplicationFormComponent },
  { path: 'calculate', component: CalculatorsPageComponent },
  { path: 'submitted', component: SubmittedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
