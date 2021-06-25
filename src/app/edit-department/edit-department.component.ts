import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {
  title: any;
  data: any;
  operation: any;
  editDepartment: any;
  hospitals: any;

  constructor(public modalRef: BsModalRef, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.hospitalService.getAllHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
    })
    if (this.operation == 'Edit') {
      this.editDepartment = new FormGroup({
        departmentname: new FormControl(this.data.departmentname),
        head: new FormControl(this.data.head),
        contactnumber: new FormControl(this.data.contactnumber),
        hospitalname: new FormControl(this.data.hospitalname)
      });
    }
    else if (this.operation == 'Add') {
      this.editDepartment = new FormGroup({
        departmentname: new FormControl(),
        head: new FormControl(),
        contactnumber: new FormControl(),
        hospitalname: new FormControl()
      });
    }
  }

  saveDepartment() {
    if (this.title.includes('Edit')) {
      this.hospitalService.editDepartment(this.data.departmentname, this.editDepartment.value).subscribe(
        result => {
          this.modalRef.hide();
          location.reload();
          alert('Department updated successfully');
        },
        error => {
          alert('Error occurred while updating department');
          console.log(error);
        }
      );
    }
    else if (this.title.includes('Add')) {
      this.hospitalService.addDepartment(this.editDepartment.value).subscribe(
        result => {
          this.modalRef.hide();
          location.reload();
          alert('Department added successfully');
        },
        error => {
          alert('Error occurred while deleting Hospital');
          console.log(error);
        }
      );
    }
  }

  deleteDepartment() {
    this.hospitalService.deleteDepartment(this.data.departmentname).subscribe(
      result => {
        this.modalRef.hide();
        location.reload();
        alert('Department deleted successfully');
      },
      error => {
        alert('Error occurred while deleting Department');
        console.log(error);
      }
    );
  }
}
