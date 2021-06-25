import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HospitalService } from './../hospital.service';
import { EditDepartmentComponent } from './../edit-department/edit-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departments: any;
  isLoaded = false;
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute, public http: HttpClient, private hospitalService: HospitalService, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    let hospitalId=this.route.snapshot.paramMap.get('id');
    this.hospitalService.getDepartmentByHospital(hospitalId).subscribe(
    department => {
      this.departments = department;
      this.isLoaded=true;
    },
    error => {
      console.log(`Retried 3 times then quit!`);
      this.router.navigate(['/hospital']);
    }
    );

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  edit(operation: any, departmentid:any) {
    let title;
    if(operation.includes('Edit')) title = 'Edit Department';
    else if(operation.includes('Delete')) title = 'Delete Department';
    else if(operation.includes('Add')) title = 'Add Department';
    let config = {
      animated: false,
      class: "modal-sm modal-dialog-centered",
      initialState: {
        title : title,
        operation : operation,
        data : this.departments.find((department: any) => department.departmentname == departmentid)
      }
    };
    this.modalRef = this.modalService.show(EditDepartmentComponent, config);
  }

  goToHospitals(){
    this.router.navigate(['hospital/']);
  }

}
