import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentForm : FormGroup;

  showOnline : boolean = false;

  showInPerson : boolean = false;

  ishidden : boolean = false;

  show : boolean = false;

  constructor( private fb: FormBuilder, private _studentService : StudentServiceService, private router : Router, 
    private _snackBar: MatSnackBar, private _loginService : LoginService ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      'isParticipation' : new FormControl(''),
      'arrivalDate' : new FormControl(''),
      'departureDate' : new FormControl(''),
      'isFinancialNeed' : new FormControl(''),
      'isAccomodation' : new FormControl(''),
      'accomodation' : new FormControl(''),
      'poster' : new FormControl(''),
      'session' : new FormControl('')
    });

    this.studentForm.valueChanges.subscribe(res => {
      if( res.isAccomodation == 'Yes'){
        this.ishidden = true;
      }else{
        this.ishidden = false;
      }
   });

    this.studentForm.valueChanges.subscribe(res => {
      if( res.poster == 'Yes'){
        this.show = true;
      }else{
        this.show = false;
      }
    });
  }

  toggleInPerson() {
    this.showInPerson = !this.showInPerson;
    this.showOnline = false;
  }

  toggleOnline() {
    this.showOnline = !this.showOnline;
    this.showInPerson = false;
  }

  submit() {
    console.log('Submitted');

    const form = JSON.stringify(this.studentForm.value);

    // this._studentService.saveStudent(form).subscribe(
    //   (data) => {
    //     console.log('Data = ', data);
    //     this._snackBar.open('Student is saved successfully !!', 'ok', {
    //       duration: 3000,
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right'
    //     });
    //     this.router.navigate(['home']);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this._snackBar.open('Error occurred !!', 'ok', {
    //       duration: 3000,
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right'
    //     });
    //   }
    // );

    this._studentService.saveStudentWithUser(form, this._loginService.getUserId()).subscribe(
      (data) => {
        console.log('Data = ', data);
        this._snackBar.open('Student is saved successfully !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error occurred !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }

}
