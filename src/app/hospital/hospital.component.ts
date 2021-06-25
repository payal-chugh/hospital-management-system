import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from './../hospital.service';
import { Router} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditHospitalComponent } from '../editHospital/editHospital.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit{
 dtOptions: DataTables.Settings = {};
 hospitals: any;
 isLoaded= false;
  modalRef: BsModalRef;

constructor(public http: HttpClient, private hospitalService: HospitalService, private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.hospitalService.getAllHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
      this.isLoaded = true;
    })
}

getDepartmentsByHospital(id: any){
  this.router.navigate(['department/'+id]);
}

edit(operation: any, hospitalid:any) {
  let title;
  if(operation.includes('Edit')) title = 'Edit Hospital';
  else if(operation.includes('Delete')) title = 'Delete Hospital';
  else if(operation.includes('Add')) title = 'Add Hospital';
  let config = {
    animated: false,
    class: "modal-sm modal-dialog-centered",
    initialState: {
      title : title,
      operation : operation,
      data : this.hospitals.find((hospital: any) => hospital.hospitalname == hospitalid)
    }
  };
  this.modalRef = this.modalService.show(EditHospitalComponent, config);
}

}
