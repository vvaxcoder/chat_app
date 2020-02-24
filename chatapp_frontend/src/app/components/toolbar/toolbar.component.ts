import { UsersService } from './../../services/users.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash/collection';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any;

  notifications = [];

  socketHost: any;

  socket: any;

  count = [];

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
   }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    const dropdownElement = document.querySelector('.dropdown-trigger');

    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  logout(event: MouseEvent) {
    this.tokenService.deleteToken();

    this.router.navigate(['']);
  }

  goToHome() {
    this.router.navigate(['streams']);
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();

      const value = _.filter(this.notifications, ['read', false]);

      this.count = value;
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markAll(event: MouseEvent) {
    this.usersService.markAllAsRead().subscribe(data => {
      console.log(data);

      this.socket.emit('refresh', {});
    });
  }
}
