import { PostService } from './../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  
  toolbarElement: any;

  commentForm: FormGroup;

  postId: any;
  
  constructor(private fb: FormBuilder, private postService: PostService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');

    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  
  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

  addComment(){
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      console.log(data);
    });
  }
}
