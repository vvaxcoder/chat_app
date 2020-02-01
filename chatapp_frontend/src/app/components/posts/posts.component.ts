import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.allPosts();
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
}
