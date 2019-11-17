import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-info-get',
  templateUrl: './info-get.component.html',
  styleUrls: ['./info-get.component.css']
})
export class InfoGetComponent implements OnInit {

  
  infos: any={};
  constructor(private auth: AuthenticationService,private router: Router) {
  }
  
  modifier(){
    this.router.navigate(['info/edit']);
  }
  ngOnInit() {
    this.auth.getInfos().subscribe(
      user => {
        this.infos = user;
      },
      err => {
        console.error(err);
      }
    )
  }

}
