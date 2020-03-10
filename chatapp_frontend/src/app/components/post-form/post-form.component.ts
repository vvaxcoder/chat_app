import { PostService } from './../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;

  socketHost: any;

  socket: any;

  uploaderFromComponent: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  selectedFile: any;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  submitPost() {
    let body;

    if (!this.selectedFile) {
      body = {
        post: this.postForm.value.post
      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile
      };
    }

    this.postService.addPost(body).subscribe(data => {
      this.socket.emit('refresh', {data: 'test'});

      this.postForm.reset();
    });
  }

  readAsBase64(file): Promise<any> {
    const reader = new FileReader();

    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

  fileSelected(event): void {
    const file: File = event[0];

    this.readAsBase64(file).then((result) => {
      this.selectedFile = result;
    }).catch(err => console.log(err));
  }
}
