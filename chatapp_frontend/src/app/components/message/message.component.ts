import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

  message: string;

  receiver: string;

  receiverData: any;

  user: any;

  messagesArray = [];

  socketHost: any;

  socket: any;

  typingMessage: any;

  typing = false;

  public eventMock;

  public eventPosMock;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');

  public toggled = false;

  public content = ' ';

  private _lastCaretEvent: CaretEvent;

  constructor(private tokenService: TokenService, private messageService: MessageService,
              private route: ActivatedRoute, private usersService: UsersService) {
    this.socketHost = 'http://localhost:3000';

    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.route.params.subscribe(params => {
      this.receiver = params.name;

      this.getUserByName(this.receiver);

      this.socket.on('refreshPage', () => {
        this.getUserByName(this.receiver);
      });
    });

    this.socket.on('is_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });
  }

  ngAfterViewInit(): void {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };

    this.socket.emit('join chat', params);
  }

  getUserByName(name: string) {
    return this.usersService.getUserByUsername(name).subscribe(data => {
      this.receiverData = data.result;

      this.getMessages(this.user._id, data.result._id);
    });
  }

  sendMessage() {
    if (this.message) {
      const { _id, username } = this.receiverData;

      this.messageService.sendMessage(this.user._id, _id, username, this.message).subscribe(data => {

        this.socket.emit('refresh', {});

        this.message = '';
      });
    }
  }

  getMessages(senderId, receiverId) {
    this.messageService.getAllMessages(senderId, receiverId).subscribe(data => {
      this.messagesArray = data.messages.message;
    });
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      });
    }, 500);
  }

  handleSelection(event: EmojiEvent) {
    // tslint:disable-next-line: max-line-length
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);

    this.eventMock = JSON.stringify(event);

    this.toggled = !this.toggled;
  }

  handleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;

    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }

  toggledEmoji() {
    this.toggled = !this.toggled;
  }
}
