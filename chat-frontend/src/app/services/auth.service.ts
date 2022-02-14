import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";
import {RegisterInfo} from "../models/registerInfo.model";
import {Observable} from "rxjs";

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

  authenticateLogin(): boolean {
    return false;
  }

  registerUser(args: RegisterInfo) {
    return this.http.post(`${this.config.getApiUrl()}/register`, args);
  }
}
