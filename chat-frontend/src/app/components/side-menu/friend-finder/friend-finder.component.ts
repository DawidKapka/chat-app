import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users.service";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'app-friend-finder',
  templateUrl: './friend-finder.component.html',
  styleUrls: ['./friend-finder.component.scss']
})
export class FriendFinderComponent {
  friendAddMenuShown: boolean = false;
  usersList: User[] = [];
  username: string = this.userInfoService.getUsername();

  constructor(private usersService: UsersService, private userInfoService: UserInfoService) {
  }

  toggleFriendFindMenu() {
    this.friendAddMenuShown = !this.friendAddMenuShown;
    if (this.friendAddMenuShown) {
      this.fetchUsers();
    }
  }

  fetchUsers() {
    this.usersService.getAllUsers().subscribe(users => {
      this.usersList = users as User[];
    })
  }

  addFriend(user: User) {
    this.usersService.addFriendToUser(user._id).then(res => {

    })
  }

}
