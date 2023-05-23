import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { InvitedSpeaker } from '../model/invitedSpeaker';

@Injectable({
  providedIn: 'root'
})
export class InvitedSpeakerService {

  constructor( private http : HttpClient ) { }

  postUserData( file : Blob, invitedSpeaker : InvitedSpeaker ) {
    console.log("API CAL SERVICE: " + invitedSpeaker);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("jsonData", JSON.stringify(invitedSpeaker));

    return this.http.post(`${baseUrl}/invited-speaker/multipart`, formData);
  }

  //save date
  // public saveDate( invitedSpeaker : any ) {
  //   return this.http.post(`${baseUrl}/invited-speaker/`, invitedSpeaker);
  // }

  postUserDataWithId( file : Blob, invitedSpeaker : InvitedSpeaker, userId : any ) {
    console.log("API CAL SERVICE: " + invitedSpeaker);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("jsonData", JSON.stringify(invitedSpeaker));
    formData.append("userId", JSON.stringify(userId));

    return this.http.post(`${baseUrl}/invited-speaker/multipart1`, formData);
  }
}
