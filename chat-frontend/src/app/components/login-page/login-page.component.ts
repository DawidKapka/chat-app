import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginInfo} from "../../models/loginInfo.model";
import {RegisterInfo} from "../../models/registerInfo.model";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  method: 'login' | 'register' = 'login'
  errors: string[] = [];
  loginInfo: LoginInfo = {username: '', passwordHash: ''};
  registerInfo: RegisterInfo = {username: '', email: '', passwordHash: ''}

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleMethod(): void {
    if (this.method === 'login') {
      this.method = 'register';
    } else {
      this.method = 'login';
    }
  }

   async submitForm(): Promise<boolean> {
     let authenticated: boolean = false;
     if (this.method === 'login') authenticated = await this.authenticateLogin();
     else authenticated = await this.registerUser();
     if (authenticated) {
       await this.router.navigate(['/home'])
       return true;
     }
     this.errors.push('Authentication Failed!');
     return false;
   }

  async authenticateLogin(): Promise<boolean> {
    return false;
  }

  async registerUser(): Promise<boolean> {
    console.log(this.registerInfo);
    console.log(this.authService.registerUser(this.registerInfo))
    return true;
  }
}
