import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash/collection';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.scss']
})
export class TopStreamsComponent implements OnInit {
  topPosts = [];

  socketHost: any;

  socket: any;

  user: any;

  constructor(private postService: PostService, private tokenService: TokenService,
              private router: Router) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.allPosts();

    this.socket.on('refreshPage', data => {
      this.allPosts();
    });
  }

  allPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.topPosts = data.top;
    }, err => {
      if (err.error.token === null) {
        this.tokenService.deleteToken();

        this.router.navigate(['']);
      }
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  postLikeHandler(post) {
    this.postService.addLike(post).subscribe(data => {
      this.socket.emit('refresh', {});
    }, error => console.log(error));
  }

  checkUserInLikes(arr, username) {
    return _.some(arr, { username });
  }

  openCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
