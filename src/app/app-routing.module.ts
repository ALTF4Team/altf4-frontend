import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LoanFormComponent} from "./loan-form/loan-form.component";

const routes: Routes = [{
  path: "", component: LandingComponent},
  {path: "loan", component: LoanFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
