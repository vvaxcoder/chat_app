import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  users = [];

  loggedInUser: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) { }

  ngOnInit() {
    this.loggedInUser = this.tokenService.getPayload();

    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(data => {
      _.remove(data.result, { username: this.loggedInUser.username });

      this.users = data.result;
    });
  }
}
