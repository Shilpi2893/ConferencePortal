import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  constructor( private http : HttpClient ) { }

  //get all Invited Speaker
  public getAllInvitedSpeaker() {
    return this.http.get(`${baseUrl}/invited-speaker/`);
  }

  //get all Non-Invited Speaker
  public getAllNonInvitedSpeaker() {
    return this.http.get(`${baseUrl}/non-invited/`);
  }

  //get all Student
  public getAllStudent() {
    return this.http.get(`${baseUrl}/student/`);
  }

  // Download file of the invited speaker
  downloadInvitedFile( fileName : string): any { 
    const headers = new HttpHeaders().set('content-disposition', 'charset=utf-8');                  
		return this.http.get(`${baseUrl}/invited-speaker/download/${fileName}`, {
      responseType: 'blob',
      headers: headers
    });
	}

  // Download file of the non-invited speaker
  downloadNonInvitedFile( fileNameAbstract : string): any { 
    const headers = new HttpHeaders().set('content-disposition', 'charset=utf-8');                  
		return this.http.get(`${baseUrl}/non-invited/download/${fileNameAbstract}`, {
      responseType: 'blob',
      headers: headers
    });
	}

}
