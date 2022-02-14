import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatboxComponent} from "./components/chatbox/chatbox.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AuthGuardService} from "./services/authGuard.service";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'home', component: ChatboxComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
