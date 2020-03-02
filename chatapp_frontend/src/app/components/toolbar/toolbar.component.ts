import { UsersService } from './../../services/users.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash/collection';
import _math from 'lodash/math';

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

  chatList = [];

  msgNumber = 0;

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
   }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    const dropdownElement = document.querySelectorAll('.dropdown-trigger');

    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    const dropdownElementTwo = document.querySelectorAll('.dropdown-trigger1');

    M.Dropdown.init(dropdownElementTwo, {
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
      console.log(this.notifications);

      const value = _.filter(this.notifications, ['read', false]);

      this.count = value;

      this.chatList = data.result.chatList;

      if (this.chatList.length) {
        this.checkIfRead(this.chatList);
      }

    },
      err => {
        if (err.error.token === null) {
          this.tokenService.deleteToken();

          this.router.navigate(['']);
        }
      });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markAll(event: MouseEvent) {
    this.usersService.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  messageDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    });
  }

  checkIfRead(arr) {
    const checkArr = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];

      if (this.router.url !== `chat/${receiver.senderName}`) {
        if (!receiver.isRead && receiver.receiverName === this.user.username) {
          checkArr.push(1);

          this.msgNumber = _math.sum(checkArr);
        }
      }
    }
  }
}
