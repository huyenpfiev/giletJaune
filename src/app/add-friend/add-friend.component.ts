import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators ,FormControl} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  angForm: FormGroup;
  select:FormControl;
  situations: any=['Marié','Divorcé','Pacsé','Célibataire','Veuf'];
  roles:any=['Casseur','Protection'];

  constructor(private fb: FormBuilder,private auth: AuthenticationService,private route: ActivatedRoute, private router: Router) {
    this.createForm();
   }

   createForm() {
    this.angForm = this.fb.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Age: ['', Validators.required ],
      Family:[this.situations[0]],
      Role:[this.roles[0]],
      Username:['',Validators.required],
      Password:['',Validators.required]
      
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
    
    this.auth.addAutre(FirstName,LastName,Age,Family,Role,Username,Password).subscribe(
      res => {
        if(res=='OK')
        this.router.navigate['friend-delete'];
  
        }

    );
      
    
  }
  

  ngOnInit() {
  }

}
