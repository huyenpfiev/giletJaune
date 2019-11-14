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
  select: FormControl;
  private familyText: String;
  private roleText:String;

  constructor(private fb: FormBuilder,private is: InfosService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Age: ['', Validators.required ],
      Family:this.familyText,
      Role:this.roleText,
      Username: ['', Validators.required ],
      Password: ['', Validators.required ]
    });
    this.select = new FormControl('');
  }
  
  onChangeFamily(event: Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    this.familyText = selectedOptions[selectedIndex].text;
    
  }
  onChangeRole(event: Event){
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    this.roleText = selectedOptions[selectedIndex].text;
   
  }
  register(FirstName, LastName, Age, Family, Role, Username, Password){
    this.is.register(FirstName, LastName, Age, Family, Role, Username, Password);
  }

  ngOnInit() {
  }

}
