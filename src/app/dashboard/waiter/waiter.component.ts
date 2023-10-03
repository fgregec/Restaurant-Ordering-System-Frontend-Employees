import { Component, OnInit } from '@angular/core';
import { AllOrdersDto, mapStatusToOrderStatus } from 'src/app/shared/models/Employee';
import { DashboardService } from '../dashboard.service';
import { SignalRService } from 'src/app/signal-r.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})

export class WaiterComponent implements OnInit {
  
  orders?: AllOrdersDto[] = [];

  constructor(private dashboardService: DashboardService, private signalRService: SignalRService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signalRService.startConnection();
    this.signalRService.addUpdateListener((message: string) => {
      this.toastr.success('Order Ready','Chef',{
        positionClass: 'toast-bottom-right'
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);});

    this.dashboardService.getOrders().subscribe(
      (response) => {
        this.orders = response;
      },
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
