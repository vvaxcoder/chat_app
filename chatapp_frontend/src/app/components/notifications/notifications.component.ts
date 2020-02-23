import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  user: any;

  userArray = [];

  notifications = [];

  socketHost: any;

  socket: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.getUser();

    this.socket.emit('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications;
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markNotification(data) {
    this.usersService.markNotification(data._id).subscribe(value => {
      console.log(value);
    });
  }

  deleteForever(data) {
    console.log(data);
  }

}
