import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  tabElement: any;

  constructor() { }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
  }

}
