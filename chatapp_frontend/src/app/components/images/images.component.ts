import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  uploaderFromComponent: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  selectedFile: any;

  user: any;

  images = [];

  socketHost: any;

  socket: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
   }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.images = data.result.images;
    }, err => console.log(err));
  }

  fileSelected(event) {
    const file: File = event[0];

    this.readAsBase64(file).then((result) => {
      this.selectedFile = result;
    }).catch(err => console.log(err));
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

  upload() {
    if (this.selectedFile) {
      this.usersService.addImage(this.selectedFile).subscribe(data => {
        this.socket.emit('refresh', {});

        const filePath = document.getElementById('filePath') as HTMLInputElement;

        filePath.value = '';
      }, err => {
        console.log(err);
      });
    }
  }

  setProfileImage(image) {
    console.log(image);
    this.usersService.setDefaultImage(image.imgId, image.imgVersion).subscribe(data => {
      this.socket.emit('refresh', {});
    }, err => console.log(err));
  }
}
