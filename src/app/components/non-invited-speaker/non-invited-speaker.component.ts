import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NonInvitedServiceService } from 'src/app/services/non-invited-service.service';
import { NonInvitedSpeaker } from 'src/app/model/non-invited-speaker';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-non-invited-speaker',
  templateUrl: './non-invited-speaker.component.html',
  styleUrls: ['./non-invited-speaker.component.scss']
})
export class NonInvitedSpeakerComponent implements OnInit {

  showOnline : boolean = false;

  showInPerson : boolean = false;

  file !: any;

  nonInvitedSpeaker = new NonInvitedSpeaker();

  nonInvitedSpeakerForm = {
    isParticipation : '',
    arrivalDate : '',
    departureDate : '',
    accommodation : '',
    isAbstract : '',
    isPoster : '',
    session : ''
  };

  constructor( private nonInvitedService : NonInvitedServiceService, private router : Router, private _loginService : LoginService,
    private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {  }

  toggleInPerson() {
    this.showInPerson = !this.showInPerson;
    this.showOnline = false;
  }

  toggleOnline() {
    this.showOnline = !this.showOnline;
    this.showInPerson = false;
  }

  onChangeFile(event : any) {
    const fileReader = new FileReader();
    this.file = event.target.files[0];

    fileReader.onload = this._handleReaderLoaded.bind(this);
    fileReader.readAsDataURL(this.file);

    this.nonInvitedSpeaker.fileAbstract = this.file;
    this.nonInvitedSpeaker.fileAbstract = this.file.name;
  }

  _handleReaderLoaded(e : any) {
    console.log("_handleReaderLoaded");
    var reader = e.target;
    this.nonInvitedSpeaker.fileAbstract = reader.result;
  }

  onSubmit() {
    console.log("Submitted");
    // this.nonInvitedSpeakerForm.reset();

    const form = JSON.stringify(this.nonInvitedSpeaker);

    if( this.file == null || this.file == ''){
      this.nonInvitedService.saveWithUSer(this.nonInvitedSpeaker, this._loginService.getUserId() ).subscribe(
        (data) => {
          //success
          console.log(data);
          this.router.navigate(['home']);
          this._snackBar.open('Saved successfully !!', 'ok', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if( this.file != null) {
      this.nonInvitedService.saveWithFile(this.file,  this.nonInvitedSpeaker, this._loginService.getUserId() ).subscribe(
        (data) => {
          //success
          console.log(data);
          this._snackBar.open('Saved successfully !!', 'ok', {
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

}
