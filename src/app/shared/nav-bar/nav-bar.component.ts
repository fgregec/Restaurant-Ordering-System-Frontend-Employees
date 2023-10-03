import { Component } from '@angular/core';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router, private accountService: AccountService) { }

    employee?: Employee | null;

    ngOnInit() {
      this.accountService.currentEmployee.subscribe(employee => {
        this.employee = employee;
      });
    }

    redirectToLogin() {
      this.router.navigateByUrl('/login');
    }

    logout(){
      this.accountService.logout();
      this.router.navigateByUrl('/login');
    }
}
