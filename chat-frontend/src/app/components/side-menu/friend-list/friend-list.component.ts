import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users.service";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  friendList: User[] = [];

  constructor(private usersService: UsersService, private userInfoService: UserInfoService) {}

  async ngOnInit() {
    this.friendList = await this.fetchFriends();
  }

  fetchFriends(): Promise<User[]> {
    return this.usersService.fetchFriends()
  }

}
