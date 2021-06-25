import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { HospitalComponent } from './hospital/hospital.component'
import { DepartmentComponent } from './department/department.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  { path: 'hospital', component: HospitalComponent },
  { path: 'department/:id', component: DepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ModalModule.forRoot(),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
