import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token) {
    this.cookieService.set('chat_token', token);
  }

  getToken() {
    return this.cookieService.get('chat_token');
  }

  deleteToken() {
    this.cookieService.delete('chat_token');
  }

  getPayload() {
    const token = this.getToken();

    let payload;

    if (token) {
      payload = token.split('.')[1];

      payload = JSON.parse(window.atob(payload));
    }

    return payload.data;
  }
}
