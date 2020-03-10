import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import * as moment from 'moment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tabElement: any;

  postsTab = false;

  followingTab = false;

  followersTab = false;

  posts = [];

  following = [];

  followers = [];

  user: any;

  name: any;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.postsTab = true;

    const tabs = document.querySelector('.tabs');

    M.Tabs.init(tabs, {});

    this.tabElement = document.querySelector('.nav-content');

    this.route.params.subscribe(params => {
      this.name = params.name;

      this.getUserData(this.name);
    });
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
  }

  changeTab(value) {
    if (value === 'posts') {
      this.postsTab = true;

      this.followingTab = false;

      this.followersTab = false;
    }

    if (value === 'following') {
      this.postsTab = false;

      this.followingTab = true;

      this.followersTab = false;
    }

    if (value === 'followers') {
      this.postsTab = false;

      this.followingTab = false;

      this.followersTab = true;
    }
  }

  getUserData(name) {
    this.usersService.getUserByUsername(name).subscribe(data => {
      this.user = data.result;
      
      this.posts = data.result.posts;

      this.following = data.result.following;

      this.followers = data.result.followers;
    }, err => console.log(err));
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
