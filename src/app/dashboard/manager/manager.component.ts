import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  
  dailyRevanue?: number;
  numberOfOrders?: number;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getManagerData().subscribe(
      (response: any) => {
        this.dailyRevanue = response.dailyRevanue;
        this.numberOfOrders = response.numberOfOrders;
      },      
      (error) => {
        console.log('Error:', error);
      }
    );
  }

}
