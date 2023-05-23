import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn : boolean = false;
  user : any = null;

  invitedSpeaker : any = null;

  nonInvitedSpeaker : any = null;

  student : any = null;

  constructor( private _loginService : LoginService, private router : Router, private _participantsService : ParticipantsService ) { }

  ngOnInit(): void {
    this._loginService.loginStatus.asObservable().subscribe(
      (data) => {
        console.log("Data ", data);
        this.isLoggedIn = this._loginService.isLoggedIn();
        this.user = this._loginService.getUser();
      }
    );
   }

  public onLogout() {
    this._loginService.logout();
    window.location.reload();
    // this.router.navigate(['login']);
  }

}
