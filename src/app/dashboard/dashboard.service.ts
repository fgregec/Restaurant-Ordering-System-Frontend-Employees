import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllOrdersDto } from '../shared/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = "http://localhost:5078/api/employee";

  constructor(private http: HttpClient) { }


  getOrders() {
    return this.http.get<AllOrdersDto[]>(`${this.baseUrl}/getcheforders`);
  }

  updateStatus(status: string, id: string){

    const requestBody = {
      Status: status,
      Id: id
    };

    return this.http.post(this.baseUrl + '/updatestatus', requestBody);
  }

}
