import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm  } from '@angular/forms';
import { Router } from '@angular/router';
import { InvitedSpeakerService } from 'src/app/services/invited-speaker.service';
import { InvitedSpeaker } from 'src/app/model/invitedSpeaker';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invited-speaker',
  templateUrl: './invited-speaker.component.html',
  styleUrls: ['./invited-speaker.component.scss']
})
export class InvitedSpeakerComponent implements OnInit {

  invitedSpeaker = new InvitedSpeaker();

  startDate = new Date(2020, 0, 2);

  file !: any;

  dateFilter = (date : any) => {
    const day = new Date(date).getDay();
    return day != 0 && day != 6;
  }

  invitedSpeakerForm = {
    arrivalDate: '',
    departureDate: ''
  };

  constructor( private _invitedSpeakerService : InvitedSpeakerService, private router : Router, private _loginService : LoginService, 
    private _snackBar: MatSnackBar ) {}

  ngOnInit(): void {}

  onChangeFile(event : any) {
    // this.invitedSpeaker = event.target.files[0];

    const fileReader = new FileReader();
    this.file = event.target.files[0];

    fileReader.onload = this._handleReaderLoaded.bind(this);
    fileReader.readAsDataURL(this.file);

    this.invitedSpeaker.fileData = this.file;
    this.invitedSpeaker.fileData = this.file.name;

    console.log(this.file);
    console.log(this.invitedSpeaker.fileData);
  }

  _handleReaderLoaded(e : any) {
    console.log("_handleReaderLoaded");
    var reader = e.target;
    this.invitedSpeaker.fileData = reader.result;
  }

  onSubmit() {
    console.log("submitted");

    // this._invitedSpeakerService.postUserData(this.file, this.invitedSpeaker).subscribe({
    //   next:(response) => {
    //     console.log("response : ", response);
    //     this.router.navigate(['home']);
    //   },
    //   error:(error) => {
    //     console.log(error);
    //   },
    //   complete: () => {
    //     console.log("request completed");
    //   }
    // });

    this._invitedSpeakerService.postUserDataWithId(this.file, this.invitedSpeaker, this._loginService.getUserId()).subscribe({
      next:(response) => {
        console.log("response : ", response);
        this._snackBar.open('Saved successfully !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.router.navigate(['home']);
      },
      error:(error) => {
        console.log(error);
        this._snackBar.open('Error occurred !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      },
      complete: () => {
        console.log("request completed");
      }
    });
  }

}
