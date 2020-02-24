import { UsersService } from './../../services/users.service';
import {Component, OnInit, ɵConsole} from '@angular/core';
import _array from 'lodash/array';
import _collection from 'lodash/collection';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  users = [];

  loggedInUser: any;

  userArray = [];

  socketHost: any;

  socket: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
   }

  ngOnInit() {
    this.loggedInUser = this.tokenService.getPayload();

    this.getUsers();

    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUsers();

      this.getUser();
    });
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(data => {
      _array.remove(data.result, { username: this.loggedInUser.username });

      this.users = data.result;
    });
  }

  getUser() {
    this.usersService.getUserById(this.loggedInUser._id).subscribe(data => {
      this.userArray = data.result.following;
    });
  }

  followUser(user) {
    this.usersService.followUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  checkInArray(arr, id) {
    const result = _collection.find(arr, ['userFollower', id]);

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
