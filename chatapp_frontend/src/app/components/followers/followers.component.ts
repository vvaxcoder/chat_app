import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  followers = [];

  user: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.getUser();
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      console.log(data);
      this.followers = data.result.followers;
    }, error => console.log(error));
  }
}
