import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  //the same, but without use of Observable
  // async getAllUsers() {
  //   return await this.http.get(`${BASEURL}/users`);
  // }
}
