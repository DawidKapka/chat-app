import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/message.model";
import {UserInfoService} from "../../services/user-info.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent {
  @Input() message: Message = {value: '', sender: '', senderName: ''};
  userId: string = '';
  senderName: string = ''

  constructor(public userInfoService: UserInfoService, private usersService: UsersService) {
    this.setUserId().then(() => this.getSenderName(this.userId));

  }

  async setUserId() {
    this.userId = await this.usersService.getUserId(this.userInfoService.getEmail()) as string;
  }

  async getSenderName(id: string) {
    const user = await this.usersService.getUserFromId(id);
    return user.username;
  }

}
