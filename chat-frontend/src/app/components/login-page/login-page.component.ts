import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginInfo} from "../../models/loginInfo.model";
import {RegisterInfo} from "../../models/registerInfo.model";
import {HashService} from "../../services/hash.service";
import {UserInfo} from "../../models/userInfo.model";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  method: 'login' | 'register' = 'login'
  errors: string[] = [];
  loginInfo: LoginInfo = {username: '', passwordHash: ''};
  registerInfo: RegisterInfo = {username: '', email: '', passwordHash: ''}

  constructor(private router: Router, private authService: AuthService, private hashService: HashService, private userInfoService: UserInfoService) { }

  toggleMethod(): void {
    if (this.method === 'login') {
      this.method = 'register';
    } else {
      this.method = 'login';
    }
  }

   async submitForm(): Promise<boolean> {
     let authenticated;
     if (this.method === 'login') authenticated = await this.authenticateLogin();
     else authenticated = await this.registerUser();
     if (authenticated.auth) {
       this.authService.toggleLoggedIn(true);
       await this.router.navigate(['/home'])
       return true;
     }
     this.authService.toggleLoggedIn(false);
     this.errors = authenticated.errors;
     return false;
   }

  async authenticateLogin() {
    const pwh = this.hashPassword(this.loginInfo);
    const response: {auth: boolean; userInfo: UserInfo, errors: string[]} = await this.authService.authenticateLogin({...this.loginInfo, passwordHash: pwh});
    if (response.auth) {
      this.userInfoService.setUsername(response.userInfo.username);
      this.userInfoService.setEmail(response.userInfo.email);
    }
    return response;
  }

  async registerUser() {
    const pwh = this.hashPassword(this.registerInfo);
    const response: {auth: string, errors: string[]} = await this.authService.registerUser({...this.registerInfo, passwordHash: pwh});
    return response
  }

  hashPassword(infoObject: LoginInfo | RegisterInfo): string {
    return this.hashService.hash(infoObject.passwordHash);
  }
}
