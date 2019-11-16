import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators ,FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfosService } from '../service/infos.service';
import { AlertService } from '../service/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  angForm: FormGroup;
  select:FormControl;
  situations: any=['Marié','Divorcé','Pacsé','Célibataire','Veuf'];
  roles:any=['Casseur','Protection'];

  constructor(private fb: FormBuilder,private is: InfosService, private alert:AlertService,private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Age: ['', Validators.required ],
      Family:[this.situations[0]],
      Role:[this.roles[0]],
      Username: ['', Validators.required ],
      Password: ['', Validators.required ]
    });
    this.select = new FormControl('');
  }
  
  onChangeFamily(event){
    this.angForm.get('Family').setValue(event.target.value,{onlySelf:true});
    //console.log(this.angForm.get('Family').value);
  }
  onChangeRole(event){
    this.angForm.get('Role').setValue(event.target.value,{onlySelf:true});
  }
  onSubmit(){
   
      var FirstName=this.angForm.get('FirstName').value;
      var LastName=this.angForm.get('LastName').value;
      var Age=this.angForm.get('Age').value;
      var Family=this.angForm.get('Family').value;
      var Role=this.angForm.get('Role').value;
      var Username=this.angForm.get('Username').value;
      var Password=this.angForm.get('Password').value;
    
    this.is.register(FirstName,LastName,Age,Family,Role,Username,Password).subscribe(
      res => {
        //this.alert.success('Registration successful', true)
        this.router.navigate(['login']);
      }
      
    );
      
    
  }

  ngOnInit() {
  }

}
