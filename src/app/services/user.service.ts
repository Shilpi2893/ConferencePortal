import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient ) { }

  //get all user
  public getAllUser() {
    return this.http.get(`${baseUrl}/user/`);
  }

}