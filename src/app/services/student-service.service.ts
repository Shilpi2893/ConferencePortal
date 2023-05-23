import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor( private http : HttpClient ) { }

  public saveStudent( student : any ) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${baseUrl}/student/`, student, { headers: headers } );
  }

  public saveStudentWithUser( student : any, userId : any ) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${baseUrl}/student/${userId}`, student, { headers: headers } );
  }
}
