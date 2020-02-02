import { TokenService } from './../../services/token.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts = [];

  socketHost: any;

  socket: any;

  user: any;

  constructor(private postService: PostService, private tokenService: TokenService) {
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
      console.log(data);
      this.posts = data.posts;
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  postLikeHandler(post) {
    this.postService.addLike(post).subscribe(data => {
      console.log(data);

      this.socket.emit('refresh', {});
    }, error => console.log(error));
  }

  checkUserInLikes(arr, username) {
    return _.some(arr, { username: username });
  }
}
