import { UsersService } from './../../services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  following = [];

  user: any;

  socketHost: any;

  socket: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.getUser();
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.following = data.result.following;
    }, error => console.log(error));
  }

  unfollowUser(user) {
    this.usersService.unfollowUser(user._id).subscribe(data => {

      this.socket.emit('refresh', {});
    });
  }
}
