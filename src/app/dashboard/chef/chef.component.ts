import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AllOrdersDto, Employee, OrderStatus, mapStatusToOrderStatus } from 'src/app/shared/models/Employee';
import { SignalRService } from 'src/app/signal-r.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  orders?: AllOrdersDto[] = [];

  constructor(private dashboardService: DashboardService, private signalRService: SignalRService){}

  ngOnInit(): void {

    this.signalRService.startConnection();
    this.signalRService.addUpdateListener((message: string) => {
      console.log('Received message from hub: ' + message);
    });

    this.dashboardService.getOrders().subscribe(
      (response) => {
        this.orders = response;
        const timeNow: number = new Date().getHours();

        this.orders = this.orders?.filter(order => {
          if (order.placedFor) {
            const placedForHour: number = new Date(order.placedFor).getHours();
            return placedForHour > timeNow;
          }
          return true; 
        });      },
          (error) => {
            console.log(error);
          }
        );    
  }

  formatDate(date: string){
    if (date && date.length > 8) {
      return date.substr(date.length - 8);
    } else {
      return date;
    }  
  }

  getStateColor(status: string){
    if(status == '0'){
      return 'not-started';
    } else if( status == '3'){
      return 'started';
    } else if (status == '2'){
      return 'cooked';
    } else if(status == '4'){
      return 'served';
    } 
    return 'not-started';
  }

  updateStatus(status: string, id: string){
    if(id){
      this.dashboardService.updateStatus(status, id).subscribe(
        (response: any) => {
          const orderToUpdate: AllOrdersDto | undefined = this.orders?.find(order => order.orderId === id);
          if(orderToUpdate){
              orderToUpdate.orderStatus = mapStatusToOrderStatus(status);      
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


}
