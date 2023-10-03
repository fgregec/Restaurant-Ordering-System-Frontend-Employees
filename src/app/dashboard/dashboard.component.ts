import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/Employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  employeeRole?: string;

  ngOnInit(): void {
    const employee: Employee = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee') || '{}') : {};
    this.employeeRole = employee.role;
  }

}
