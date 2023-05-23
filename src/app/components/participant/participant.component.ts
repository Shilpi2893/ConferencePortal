import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { saveAs } from 'file-saver';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  public users : any = [];

  invitedSpeakers : any = [];

  nonInvitedSpeakers : any = [];

  student : any = [];

  constructor( private _participantsService : ParticipantsService, private _loginService : LoginService ) { }

  ngOnInit(): void {

    //INVITED-SPEAKER
    this._participantsService.getAllInvitedSpeaker().subscribe( 
      (data1) => {
        this.invitedSpeakers = data1;
        this._loginService.loginStatus.next(true);
      },
      (error) => console.log(error)
    );

    //NON-INVITED SPEAKER
    this._participantsService.getAllNonInvitedSpeaker().subscribe(
      (data2) => {
        this.nonInvitedSpeakers = data2;
        this._loginService.loginStatus.next(true);
      },
      (error) => console.log(error)
    );

    //STUDENT
    // this._participantsService.getAllStudent().subscribe(
    //   (data3) => {
    //     this.student = data3;
    //     console.log(this.student);
    //   },
    //   (error) => console.log(error)
    // );
  }

  downloadFileInvited( fileName : string ) {
    this._participantsService.downloadInvitedFile(fileName).subscribe(
      (res : any) => {
        let blob : any = new Blob( [res], { 
          type: 'text/json; charset=utf-8' 
        });
        const url = window.URL.createObjectURL(blob);

        // let fileName = res.headers.get('content-disposition') // if not passing the file name in the parameter but in the headers
        // ?.split(';')[1].split('=')[1];

        saveAs(blob, fileName);
      }), 
      (error: any) => console.log(error),
      () => console.info('File downloaded successfully');
  }

  downloadFileNonInvited( fileNameAbstract : string ) {
    this._participantsService.downloadNonInvitedFile(fileNameAbstract).subscribe(
      (res : any) => {
        let blob : any = new Blob( [res], { 
          type: 'text/json; charset=utf-8' 
        });
        const url = window.URL.createObjectURL(blob);

        saveAs(blob, fileNameAbstract);
      }), 
      (error: any) => console.log(error),
      () => console.info('File downloaded successfully');
  }

}
