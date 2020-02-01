import { PostService } from './../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  submitPost() {
    this.postService.addPost(this.postForm.value).subscribe(data => {
      this.postForm.reset();
    });
  }
}
