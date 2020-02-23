import { UsersService } from './../../services/users.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any;

  notifications = [];

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    const dropdownElement = document.querySelector('.dropdown-trigger');

    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.getUser();
  }

  logout() {
    this.tokenService.deleteToken();

    this.router.navigate(['']);
  }

  goToHome() {
    this.router.navigate(['streams']);
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
    });
  }

}
