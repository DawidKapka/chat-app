import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";
import {RegisterInfo} from "../models/registerInfo.model";
import {UserInfo} from "../models/userInfo.model";
import {LoginInfo} from "../models/loginInfo.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  getLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  toggleLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  authenticateLogin(args: LoginInfo): Promise<{auth: boolean, userInfo: UserInfo, errors: string[]}> {
    const that = this;
    return new Promise(resolve => {
      that.http.post(`${this.config.getApiUrl()}/user/login`, args).subscribe(res => {
        resolve(res as {auth: boolean; userInfo: UserInfo, errors: string[]})
      })
    })
  }

  registerUser(args: RegisterInfo): Promise<{auth: string, errors: string[]}> {
    const that = this;
    return new Promise((resolve) => {
      that.http.post(`${this.config.getApiUrl()}/user/register`, args).subscribe(res => {
        resolve(res as {auth: string, errors: string[]});
      });
    })
  }
}
