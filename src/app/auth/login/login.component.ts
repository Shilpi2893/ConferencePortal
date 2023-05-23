import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginData = {
    'userName' : '',
    'password' : ''
  };

  constructor( private _loginService : LoginService, private router : Router, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginData);
    console.log('Login clicked');

    if( this.loginData.password.trim() == '' || this.loginData.password == null ) {
      this._snackBar.open('Password is required !!', 'X', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }

    // request to server to generate token
    this._loginService.generateToken(this.loginData).subscribe(
      (data : any) => {
        console.log('success');
        console.log('Token = ', data);

        //login
        this._loginService.setToken(data.token);

        this._loginService.getCurrentUser().subscribe(
          (user : any) => {
            console.log('User = ', user);
            this._loginService.setUser(user);
            if( this._loginService.getUserRole() == 'ADMIN' ) {
              this.router.navigate(['admin-dashboard']);
              this._loginService.loginStatus.next(true);
              this._snackBar.open('Logged in successfully !!', 'ok', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }else if( this._loginService.getSpeaker() == 'Non-Invited Speaker' ) {
              this.router.navigate(['non-invited']);
              this._loginService.loginStatus.next(true);
              this._snackBar.open('Logged in successfully !!', 'ok', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }else if( this._loginService.getSpeaker() == 'Invited Speaker' ) {
              this.router.navigate(['invited']);
              this._loginService.loginStatus.next(true);
              this._snackBar.open('Logged in successfully !!', 'ok', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }else if( this._loginService.getSpeaker() == 'Student' ) {
              this.router.navigate(['student']);
              this._loginService.loginStatus.next(true);
              this._snackBar.open('Logged in successfully !!', 'ok', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }
            
            else {
              this._loginService.logout();
              this._snackBar.open('Logged out successfully !!', 'ok', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }
          },
          (error) => {
            console.log('Error ! ', error);
            this._snackBar.open('Invalid Credentials !!', 'ok', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          }
        )

      },
      (error) => {
        console.log('error = ', error);
        this._snackBar.open('Error Occurred !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );

  }

}
