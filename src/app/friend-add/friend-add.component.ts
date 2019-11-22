import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {

  list: any=[];

  constructor(private auth: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.auth.getUnFriends().subscribe(res=>{
      if(res=="AllFriends")
      this.list=[];
      else
      this.list=res;
    });
  }
  addFriend(id,index){
    
    this.auth.addFriend(id).subscribe(res=>{
      
      if(res=="OK")
        this.list.splice(index,1);
    
    });
    
  }
  showFriends(){
    this.router.navigate(['friend/delete']);
  }
  addAutre(){
    this.router.navigate(['friend/addAutre']);
  }
}
