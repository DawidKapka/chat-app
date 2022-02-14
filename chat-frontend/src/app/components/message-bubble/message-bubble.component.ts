import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/message.model";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent implements OnInit {
  @Input() message: Message = {value: '', sender: ''};

  constructor(public userInfoService: UserInfoService) { }

  ngOnInit(): void {
  }

}
