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
export class LoginPageComponent implements OnInit {

  method: 'login' | 'register' = 'login'
  errors: string[] = [];
  loginInfo: LoginInfo = {username: '', passwordHash: '', isHashed: false};
  registerInfo: RegisterInfo = {username: '', email: '', passwordHash: '', isHashed: false}
  stayLogged: boolean = false;
  isSuccessVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService, private hashService: HashService, private userInfoService: UserInfoService) { }

  toggleMethod(): void {
    if (this.method === 'login') {
      this.method = 'register';
    } else {
      this.method = 'login';
    }
  }

  ngOnInit() {
    if (localStorage['user-username'] && localStorage['user-password']) {
      this.loginInfo = {
        username: localStorage['user-username'],
        passwordHash: localStorage['user-password'],
        isHashed: true
      }
      this.submitForm().then(r => r);
    }
  }

  async submitForm(): Promise<void> {
     let authenticated;
     if (this.method === 'login') authenticated = await this.authenticateLogin();
     else authenticated = await this.registerUser();
     if (authenticated.auth) {
       this.authService.toggleLoggedIn(true);
       await this.router.navigate([this.method === 'login' ? '/home' : '/login'])
       if (this.method === 'register') this.method = 'login';
       this.showRegisterSuccess()
     }
     this.authService.toggleLoggedIn(false);
     this.errors = authenticated.errors;
   }

  async authenticateLogin() {
    let pwh;
    if (!this.loginInfo.isHashed) {
      pwh = this.hashPassword(this.loginInfo);
    } else pwh = this.loginInfo.passwordHash;

    const response: {auth: boolean; userInfo: UserInfo, errors: string[]} = await this.authService.authenticateLogin({...this.loginInfo, passwordHash: pwh});
    if (response.auth) {
      if (this.stayLogged) {
        localStorage['user-username'] = response.userInfo.username;
        localStorage['user-email'] = response.userInfo.email;
        localStorage['user-password'] = response.userInfo.passwordHash;
      }
      this.userInfoService.setUsername(response.userInfo.username);
      this.userInfoService.setEmail(response.userInfo.email);
    }
    return response;
  }

  async registerUser() {
    let pwh;
    if (!this.registerInfo.isHashed) {
      pwh = this.hashPassword(this.registerInfo)
    } else pwh = this.registerInfo.passwordHash;
    return this.authService.registerUser({...this.registerInfo, passwordHash: pwh});
  }

  hashPassword(infoObject: LoginInfo | RegisterInfo): string {
    return this.hashService.hash(infoObject.passwordHash);
  }

  setStayLoggedIn(): void {
    this.stayLogged = !this.stayLogged;
  }

  showRegisterSuccess() {
    this.isSuccessVisible = true;
    setTimeout(() => {
      this.isSuccessVisible = false;
    }, 2000);
  }
}
