import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfosService } from '../service/infos.service';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;

  constructor(private fb: FormBuilder,private is: InfosService,private auth:AuthenticationService, private router: Router) {
  this.createForm();
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
        console.log(res);
      }
      else{
        this.router.navigate(['infos']);
      }
      
    });
  }

  ngOnInit() {
  }

}
