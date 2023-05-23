import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { NonInvitedSpeaker } from '../model/non-invited-speaker';

@Injectable({
  providedIn: 'root'
})
export class NonInvitedServiceService {

  constructor( private http : HttpClient ) { }

  //save
  public save( nonInvitedSpeaker : any ) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${baseUrl}/non-invited/`, nonInvitedSpeaker, { headers: headers });
  }

  // public save( file : Blob, nonInvitedSpeaker : NonInvitedSpeaker ) {
  //   console.log("API CAL SERVICE: " + nonInvitedSpeaker);

  //   let formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("jsonData", JSON.stringify(nonInvitedSpeaker));

  //   return this.http.post(`${baseUrl}/non-invited/multipart`, formData);
  // }

  public saveWithFile( file : Blob, nonInvitedSpeaker : NonInvitedSpeaker, userId : any ) {
    console.log("API CAL SERVICE: " + nonInvitedSpeaker);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("jsonData", JSON.stringify(nonInvitedSpeaker));
    formData.append("userId", JSON.stringify(userId));

    return this.http.post(`${baseUrl}/non-invited/multipart1`, formData);
  }

  //save with user
  public saveWithUSer( nonInvitedSpeaker : any , userId : any  ) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${baseUrl}/non-invited/${userId}`, nonInvitedSpeaker, { headers: headers });
  }
}
