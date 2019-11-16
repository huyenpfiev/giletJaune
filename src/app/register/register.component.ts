import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators ,FormControl} from '@angular/forms';
import { InfosService } from '../infos.service';
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

  constructor(private fb: FormBuilder,private is: InfosService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Age: ['', Validators.required ],
      Family:['Marié'],
      Role:['Casseur'],
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
    this.is.register(JSON.stringify(this.angForm.value));
    
  }

  ngOnInit() {
  }

}
