import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/message.model";
import {MessageService} from "../../services/message.service";
import {UserInfoService} from "../../services/user-info.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent{
  textInput: string = '';
  username: string = this.userInfoService.getUsername();
  messages: Message[] = [];

  constructor(private messageService: MessageService, public userInfoService: UserInfoService, private usersService: UsersService) {
    this.fetchMessages()

  }

  async sendMessage(value: string) {
    let message: Message = {
      value: value,
      sender: await this.usersService.getUserId(this.userInfoService.getEmail()) as string,
      senderName: this.userInfoService.getUsername()
    }
    this.messageService.send(message).subscribe(res => this.fetchMessages());
    this.textInput = '';

  }

  fetchMessages() {
    this.messages = [];
    this.messageService.get().subscribe(messages => {
      this.messages = messages as Message[];
    })
  }
}


