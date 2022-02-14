import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  method: 'login' | 'register' = 'login'

  constructor() { }

  ngOnInit(): void {
  }

  toggleMethod() {
    if (this.method === 'login') {
      this.method = 'register';
    } else {
      this.method = 'login';
    }
  }
}
