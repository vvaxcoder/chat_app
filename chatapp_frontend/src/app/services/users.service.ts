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

  getUserById(id): Observable<any> {
    return this.http.get(`${BASEURL}/users/${id}`);
  }

  getUserByUsername(username): Observable<any> {
    return this.http.get(`${BASEURL}/usersby/${username}`);
  }

  setDefaultImage(imgId, imgVersion): Observable<any> {
    return this.http.get(`${BASEURL}/set-default-image/${imgId}/${imgVersion}`);
  }

  // the same, but without use of Observable
  // async getAllUsers() {
  //   return await this.http.get(`${BASEURL}/users`);
  // }

  followUser(userFollower): Observable<any> {
    return this.http.post(`${BASEURL}/follow-user`, { userFollower });
  }

  unfollowUser(userFollower): Observable<any> {
    return this.http.post(`${BASEURL}/unfollow-user`, { userFollower });
  }

  markNotification(id, isDelete?): Observable<any> {
    return this.http.post(`${BASEURL}/mark/${id}`, { id, isDelete });
  }

  markAllAsRead(): Observable<any> {
    return this.http.post(`${BASEURL}/mark-all`, { all: true });
  }

  addImage(image): Observable<any> {
    return this.http.post(`${BASEURL}/upload-image`, { image });
  }

  profileNotifications(id): Observable<any> {
    return this.http.post(`${BASEURL}/user/view-profile`, { id });
  }

  changePassword(body): Observable<any> {
    return this.http.post(`${BASEURL}/change-password`, body);
  }
}
