import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../account.service';
import { LoginEmployee } from 'src/app/shared/models/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private title: Title, private accountService: AccountService, private router: Router) 
  {
    this.title.setTitle('Login');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login(){
    if(this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password){
      const user: LoginEmployee = new LoginEmployee(this.loginForm.value.email, this.loginForm.value.password);

      this.accountService.login(user).subscribe(
        (response) => {
          this.accountService.updateEmployee(response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

}
