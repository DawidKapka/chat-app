import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): boolean {
    if (this.authService.getLoggedIn()) {
      return true
    }
    return false;
  }
}
