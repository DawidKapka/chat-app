import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {UserInfoService} from "./user-info.service";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private config: ConfigService, private userInfoService: UserInfoService) { }

  getAllUsers() {
    return this.http.get(`${this.config.getApiUrl()}/user/all`)
  }

  getUserId(email: string) {
    const that = this;
    return new Promise(function (resolve) {
      that.http.post(`${that.config.getApiUrl()}/user/id`, {email: email}).subscribe(res => {
        resolve((res as any).id as string);
      })
    })
  }

  addFriendToUser(_id: string): Promise<boolean> {
    const that = this;
    return new Promise(async function (resolve) {
      const id = await that.getUserId(that.userInfoService.getEmail());
      that.http.post(`${that.config.getApiUrl()}/user/friends/add`, {userId: id, friendId: _id}).subscribe(res => {
        resolve(res as boolean);
      })
    })
  }

  getUserFromId(id: string): Promise<User> {
    return new Promise((resolve) => {
      this.http.get(`${this.config.getApiUrl()}/user/${id}`).subscribe(res => resolve(res as User))
    });
  }

  async fetchFriends(): Promise<User[]> {
    const id = await this.getUserId(this.userInfoService.getEmail())
    return new Promise((resolve) => {
      this.http.get(`${this.config.getApiUrl()}/user/${id}/friends`).subscribe(async res => {
        const users: User[] = [];
        for (let id of (res as string[])) {
          users.push(await this.getUserFromId(id));
        }
        resolve(users);
      });
    })
  }
}
