import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  token: any;

  streamsTab = false;

  topStreamsTab = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.topStreamsTab = true;

    this.token = this.tokenService.getPayload();

    const tabs = document.querySelector('.tabs');

    M.Tabs.init(tabs, {});
  }

  changeTabs(value) {
    if (value === 'streams') {
      this.streamsTab = true;

      this.topStreamsTab = false;
    }

    if (value === 'top') {
      this.streamsTab = false;

      this.topStreamsTab = true;
    }
  }
}
