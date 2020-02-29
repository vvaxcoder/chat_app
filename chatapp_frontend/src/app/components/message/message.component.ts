import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  message: string;

  receiver: string;

  receiverData: any;

  user: any;

  constructor(private tokenService: TokenService, private messageService: MessageService,
              private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.route.params.subscribe(params => {
      this.receiver = params.name;

      this.getUserByName(this.receiver);
    });
  }

  getUserByName(name: string) {
    return this.usersService.getUserByUsername(name).subscribe(data => {
      console.log(data);
      this.receiverData = data.result;
    });
  }

  sendMessage() {
    if (this.message) {
      const { _id, username } = this.receiverData;

      this.messageService.sendMessage(this.user._id, _id, username, this.message).subscribe(data => {
        console.log(data);

        this.message = '';
      });
    }
  }

}
