import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { RegisterData } from '../registerData.model';
import { FormCustomValidators } from './formCustomvalidators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  proPic= "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  fname = "";
  lname = "";
  dob = "";
  email = "";
  password = "";
  conpassword = "";
  regsData! : RegisterData;
  registerForm!: FormGroup;
  private mode ='create';
  private datasId :any;
  constructor(private registerService: RegisterService,private route:Router,private aRoute: ActivatedRoute) { }

  ngOnInit() {
    const onlyalphaWithSpace = '^[a-zA-Z ]*$';
    // const passwordRegx = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/";
    this.registerForm = new FormGroup({
      fname : new FormControl(null,{validators:[Validators.required,Validators.pattern(onlyalphaWithSpace),Validators.minLength(4)]}),
      lname : new FormControl(null,{validators:[Validators.required,Validators.pattern(onlyalphaWithSpace),Validators.minLength(4)]}),
      dob : new FormControl(null,{validators:[Validators.required]}),
      email : new FormControl(null,{validators:[Validators.required,Validators.email]}),
      password : new FormControl(null,{validators:[Validators.required,FormCustomValidators.confirmPasswordvalidators,FormCustomValidators.passWordValidator]})
    });
    this.aRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('dataid')){
        this.mode = 'edit';
        this.datasId = paramMap.get('dataid');
        this.registerService.getEditdata(this.datasId)
        .subscribe(dataDetails=>{
          this.regsData = {id : dataDetails._id,
            fname: dataDetails.fname,
            lname:dataDetails.lname,
            dob:new Date(dataDetails.dob),
            email: dataDetails.email,
            password:dataDetails.password};
            this.registerForm.setValue({'fname':this.regsData.fname,'lname':this.regsData.lname,
            'dob':this.regsData.dob,'email':this.regsData.email,'password':this.regsData.password});
        });
      }else{
        this.mode = 'create';
        this.datasId= null;
      }
    })
  }

  onSavesdetails(){
    if(this.mode === 'create'){
      this.registerService.onRegister(this.registerForm.value.fname,this.registerForm.value.lname,this.registerForm.value.dob,this.registerForm.value.email,this.registerForm.value.password);
    }
    else{
      this.registerService.editdata(this.datasId,this.registerForm.value.fname,this.registerForm.value.lname,this.registerForm.value.dob,this.registerForm.value.email,this.registerForm.value.password);
    }
    this.route.navigate(['datalist']);
    this.registerForm.reset();
  }
  
  onImagePicked(event: Event){
    this.proPic = (event.target as HTMLInputElement).value;
  }
  
  
}

