import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

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

  constructor() { }

  ngOnInit() {
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
    console.log(this.selectedFile);
  }
}
