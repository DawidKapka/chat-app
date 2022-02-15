import {Component} from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  username: string = this.userInfoService.getUsername();
  email: string = this.userInfoService.getEmail();
  friendAddMenuShown: boolean = false;
  usersList: User[] = [];

  constructor(private userInfoService: UserInfoService, private router: Router, private authService: AuthService, private usersService: UsersService) {}

  signOut() {
    localStorage.removeItem('user-username');
    localStorage.removeItem('user-password');
    localStorage.removeItem('user-email');
    this.userInfoService.clear();
    this.authService.toggleLoggedIn(false);
    this.router.navigate(['/login']);
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
    this.usersService.addFriendToUser(user._id)
  }
}
