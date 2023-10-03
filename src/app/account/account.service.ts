import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, LoginEmployee } from '../shared/models/Employee';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = "http://localhost:5078/api/employee";
  private jwtTokenKey = 'jwtToken';

  private employee = new BehaviorSubject<Employee | null>(null);
  currentEmployee = this.employee.asObservable();

  constructor(private http: HttpClient) {
    var employee = localStorage.getItem('employee');
    if(employee){
      this.updateEmployee(JSON.parse(employee) as Employee)
    }
   }

  login(user: LoginEmployee) {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap(response => {
        const jwtToken = response?.token;
        const employee = response?.result;
        if (jwtToken && employee) {
          localStorage.setItem(this.jwtTokenKey, jwtToken);
          localStorage.setItem('employee', JSON.stringify(employee));
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.employee.next(null);
  }

  updateEmployee(employee: Employee){
    this.employee.next(employee);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }
}
