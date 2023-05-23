import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor( private _signupService : SignupService, private _snackBar: MatSnackBar, private router : Router ) { }

  mySignUpForm: any = FormGroup;

  ngOnInit(): void {
    this.mySignUpForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required]),
      'universityName': new FormControl(null, Validators.required),
      'speaker': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.mySignUpForm);

    if( this.mySignUpForm.userName == null && this.mySignUpForm.userName == '' ) {
      this._snackBar.open('Username is required !!', 'ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }

    //Add user
    this._signupService.addUser(this.mySignUpForm.value).subscribe(
      (data : any) => {
        //success
        console.log("Data = ", data);
        this._snackBar.open('User is registered successfully !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.router.navigate(['login']);
      },
      (error) => {
        //error
        console.log("error", error);
      }
    )

  }

}
