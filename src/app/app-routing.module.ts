import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './data-list/data-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '',redirectTo:'datalist',pathMatch: 'full'},
  {path: 'regForm',component: RegistrationFormComponent},
  {path: 'edit/:dataid',component: RegistrationFormComponent},
  {path: 'datalist',component: DataListComponent},
  {path: 'Not-found',component:PageNotFoundComponent},
  {path: '**', redirectTo:'Not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
