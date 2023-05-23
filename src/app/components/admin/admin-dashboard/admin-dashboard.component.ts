import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public user : any = null;

  isAuthority : boolean = false;

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
