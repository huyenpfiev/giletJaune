import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.css']
})
export class InfoEditComponent implements OnInit {

  angForm: FormGroup;
  situations: any=['Marié','Divorcé','Pacsé','Célibataire','Veuf'];
  roles:any=['Casseur','Protection'];
  infos: any={};

  constructor(private auth: AuthenticationService,private router: Router,private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Age: ['', Validators.required ],
      Family:[''],
      Role:['']
      
    });
    
  }
  onChangeFamily(event){
    this.angForm.get('Family').setValue(event.target.value,{onlySelf:true});
    
  }
  onChangeRole(event){
    this.angForm.get('Role').setValue(event.target.value,{onlySelf:true});
  }
  update(){
      var FirstName=this.angForm.get('FirstName').value;
      var LastName=this.angForm.get('LastName').value;
      var Age=this.angForm.get('Age').value;
      var Family=this.angForm.get('Family').value;
      var Role=this.angForm.get('Role').value;
      this.auth.update(FirstName,LastName,Age,Family,Role).subscribe(
        res => {
          if(res=='OK'){
            this.router.navigate(['infos']);
          }
        }
        
      );
  }
  cancel(){
    this.router.navigate(['infos']);
  }
  ngOnInit() {
    this.auth.getInfos().subscribe(
      user => {
        this.infos = user;
        
      },
      err => {
        console.error(err);
      }
    );
  }

}
