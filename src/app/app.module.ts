import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChefComponent } from './dashboard/chef/chef.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { WaiterComponent } from './dashboard/waiter/waiter.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ManagerComponent } from './dashboard/manager/manager.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    DashboardComponent,
    ChefComponent,
    NavBarComponent,
    WaiterComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatChipsModule,
    CommonModule,
    ToastrModule.forRoot(), 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
