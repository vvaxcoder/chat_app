import { PostService } from './../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  toolbarElement: any;

  commentForm: FormGroup;

  postId: any;

  commentsArray = [];

  socketHost: any;

  socket: any;

  post: string;

  constructor(private fb: FormBuilder, private postService: PostService,
              private route: ActivatedRoute) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');

    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();

    this.getPost();

    this.socket.on('refreshPage', data => { this.getPost(); });
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});

      this.commentForm.reset();
    });
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data.post.post;

      this.commentsArray = data.post.comments.reverse();
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
