import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  tabElement: any;

  online_users = [];

  constructor() { }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
  }

  online(event: any[]) {
    this.online_users = event;
  }
}
