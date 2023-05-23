import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showToAdmin : boolean = false;

  constructor(private _loginService : LoginService) {}

  ngOnInit(): void {
    // this._loginService.getUserRole().subscribe(
    //   (res : any) => {
    //     if( res == 'ADMIN') {
    //       this.showToAdmin = true;
    //     }else {
    //       this.showToAdmin = false;
    //     }
    //   }
    // );
  }

}
