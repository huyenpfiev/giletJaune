import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  invalid:boolean;
  
  constructor(private fb: FormBuilder,private auth:AuthenticationService, private router: Router) {
  this.createForm();
  this.invalid=false;
  }

  createForm() {
    this.angForm = this.fb.group({
      Username: ['', Validators.required ],
      Password: ['', Validators.required ]
    });
    
  }
  onSubmit(){
    var Username=this.angForm.get('Username').value;
    var Password=this.angForm.get('Password').value;
    this.auth.login(Username,Password).subscribe(res=>{
      
      if(res['Account'] == 'Incorrect'){
        this.invalid=true;
      }
      else{
        this.router.navigate(['infos']);
      }
      
    });
  }

  ngOnInit() {
  }

}
