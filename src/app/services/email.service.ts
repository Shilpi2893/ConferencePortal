import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor( private http : HttpClient ) { }

  //send email
  public sendMail( sendMail : any ) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${baseUrl}/sendEmail`, sendMail, { headers: headers });
  }
}
