import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http : HttpClient ) { }

  // public loginStatus = new Subject<boolean>();
  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  // Generate Token
  public generateToken( loginData: any ) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user: set token in localStorage
  public setToken(token : any) {
    localStorage.setItem('token', token);
    return true;
  }

  // Get token from local storage
  public getToken() {
    return localStorage.getItem('token');
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if( tokenStr == undefined || tokenStr == '' || tokenStr == null ) {
      return false;
    }else {
      return true;
    }
  }

  //logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Set userDetails
  public setUser(user : any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get User
  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null ) {
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  // Get Roles
  public getUserRole() {
    let userRoles = this.getUser();
    return userRoles.authorities[0].authority;
  }

  //Getting current user :  which is loggedIn
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Get speaker from current user
  public getSpeaker() {
    let speaker = this.getUser();
    return speaker.speaker;
  }

  //Getting cuurent user id
  public getUserId() {
    let userId = this.getUser();
    return userId.id;
  }


  checkLoginStatus() : boolean {
    var loginToken = localStorage.getItem('token');

    if( loginToken == 'token' ) {
      return true;
    }
    
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

}
