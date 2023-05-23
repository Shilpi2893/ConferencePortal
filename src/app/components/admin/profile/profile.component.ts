import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user : any = null;

  constructor( private _loginService : LoginService ) { }

  ngOnInit(): void {
    this._loginService.getCurrentUser().subscribe(
      (data : any) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
