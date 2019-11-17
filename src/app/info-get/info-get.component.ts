import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../service/authentication.service';
@Component({
  selector: 'app-info-get',
  templateUrl: './info-get.component.html',
  styleUrls: ['./info-get.component.css']
})
export class InfoGetComponent implements OnInit {

  details: UserDetails;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    // this.auth.getInfos().subscribe(
    //   user => {
    //     this.details = user;
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // )
  }

}
