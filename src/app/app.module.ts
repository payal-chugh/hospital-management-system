import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DepartmentComponent } from './department/department.component';
import { DataTablesModule } from "angular-datatables";
import { HospitalService } from './hospital.service';
import {HttpClientModule} from '@angular/common/http';
import { EditHospitalComponent } from './editHospital/editHospital.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDepartmentComponent } from './edit-department/edit-department.component';


@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    DepartmentComponent,
    EditHospitalComponent,
    EditDepartmentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule ,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HospitalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
