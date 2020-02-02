import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }

  addLike(id): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-like`, id);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }
}
