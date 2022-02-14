import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {
  private username: string = '';
  private email: string = '';

  getUsername(): string { return this.username; }

  setUsername(value: string): void { this.username = value; }

  getEmail(): string { return this.email }

  setEmail(value: string): void { this.email = value; }
}
