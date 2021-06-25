import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import { environment } from '../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(public http: HttpClient) { }

  getAllHospitals(): Observable<any> {
    return this.http.get(environment.baseurl+'hospital' + '/');
  }

  getDepartmentByHospital(id: any): Observable<any> {
    return this.http.get(environment.baseurl+'department/hospital/'+id);
  }

  editHospital(id: any, data: any): Observable<any> {
    const body=JSON.stringify({
      "hospitalname":data.hospitalname,
      "contactnumber": data.contactnumber
    });
    return this.http.put(environment.baseurl+'hospital' + '/' + id + '/', body, {headers:this.headers});
  }

  deleteHospital(id: any): Observable<any> {
    return this.http.delete(environment.baseurl+'hospital' + '/' + id);
  }

  addHospital(data: any): Observable<any> {
    const body=JSON.stringify({
      "hospitalname":data.hospitalname,
      "contactnumber": data.contactnumber
    });
    return this.http.post(environment.baseurl+'hospital/' , body, {headers:this.headers});
  }

  editDepartment(id: any, data: any): Observable<any> {
    const body=JSON.stringify({
      "departmentname": data.departmentname,
      "head":data.head,
      "hospitalname":data.hospitalname,
      "contactnumber": data.contactnumber
    });
    return this.http.put(environment.baseurl+'department' + '/' + id + '/', body, {headers:this.headers});
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(environment.baseurl+'department' + '/' + id);
  }

  addDepartment(data: any): Observable<any> {
    const body=JSON.stringify({
      "departmentname": data.departmentname,
      "head":data.head,
      "hospitalname":data.hospitalname,
      "contactnumber": data.contactnumber
    });
    return this.http.post(environment.baseurl+'department/' , body, {headers:this.headers});
  }
}
