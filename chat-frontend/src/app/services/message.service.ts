import { Injectable } from '@angular/core';
import {Message} from "../models/message.model";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "./users.service";
import {UserInfoService} from "./user-info.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private userInfoService: UserInfoService, private usersService: UsersService) { }

  send(message: Message) {
    return this.http.post('http://localhost:3000/messages', {
      value: message.value,
      sender: message.sender,
      senderName: message.senderName
    });
  }

  get() {
    return this.http.get('http://localhost:3000/messages');
  }
}
