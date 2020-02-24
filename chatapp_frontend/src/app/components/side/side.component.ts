import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  user: any;

  socketHost: any;

  socket: any;

  userData: any;

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
      this.userData = data.result;
    });
  }

}
