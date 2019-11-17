import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-friend-delete',
  templateUrl: './friend-delete.component.html',
  styleUrls: ['./friend-delete.component.css']
})
export class FriendDeleteComponent implements OnInit {

  list: any=[];
  hasFriends:boolean;
  constructor(private auth: AuthenticationService,private router: Router) { 
    this.hasFriends=true;
  }

  ngOnInit() {
    this.auth.getFriends().subscribe(
      res => {
        
        if(res=="No friends"){
          this.hasFriends=false;
          this.list=[];
        }
        else{
          this.hasFriends=true;
          this.list = res;
        }
        
      },
      err => {
        console.error(err);
      }
    )

  }
  deleteFriend(id,index){
    
    this.auth.deleteFriend(id).subscribe(
      res => {
        if(res=='OK')
          this.list.splice(index,1);
      },
      err => {
        console.error(err);
      }
    );
   
  }
  getUnFriend(){
    this.router.navigate(['friend/add']);
  }

}
