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
      console.log(data);
      this.notifications = data.result.notifications.reverse();
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markNotification(data) {
    this.usersService.markNotification(data._id).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

  deleteNotification(data) {
    this.usersService.markNotification(data._id, true).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

}
