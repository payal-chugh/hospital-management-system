import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-editHospital',
  templateUrl: './editHospital.component.html',
  styleUrls: ['./editHospital.component.scss']
})
export class EditHospitalComponent implements OnInit {
  title: any;
  data: any;
  operation: any;
  editHospital: any;

  constructor(public modalRef: BsModalRef, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    if (this.operation == 'Edit') {
      this.editHospital = new FormGroup({
        hospitalname: new FormControl(this.data.hospitalname),
        contactnumber: new FormControl(this.data.contactnumber)
      });
    }
    else if (this.operation == 'Add') {
      this.editHospital = new FormGroup({
        hospitalname: new FormControl(),
        contactnumber: new FormControl()
      });
    }
  }

  saveHospital() {
    if (this.title.includes('Edit')) {
      this.hospitalService.editHospital(this.data.hospitalname, this.editHospital.value).subscribe(
        result => {
          this.modalRef.hide();
          location.reload();
          alert('Hospital updated successfully');
        },
        error => {
          alert('Error occurred while updating hospital');
          console.log(error);
        }
      );
    }
    else if (this.title.includes('Add')) {
      this.hospitalService.addHospital(this.editHospital.value).subscribe(
        result => {
          this.modalRef.hide();
          location.reload();
          alert('Hospital added successfully');
        },
        error => {
          alert('Error occurred while deleting Hospital');
          console.log(error);
        }
      );
    }
  }

  deleteHospital() {
    this.hospitalService.deleteHospital(this.data.hospitalname).subscribe(
      result => {
        this.modalRef.hide();
        location.reload();
        alert('Hospital deleted successfully');
      },
      error => {
        alert('Error occurred while deleting Hospital');
        console.log(error);
      }
    );
  }
}
