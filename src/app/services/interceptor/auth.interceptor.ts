import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( private _loginService : LoginService ) {}

  intercept( httpRequest: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // Add the JWT token (localStorage) request
    let authReq = httpRequest;
    const token = this._loginService.getToken();
    console.log('inside interceptor');
    if( token != null ) {
        authReq = authReq.clone({ 
            setHeaders: { Authorization: `Bearer ${token}` } 
        });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]