import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFlag : Boolean = true

  signInForm: FormGroup;

  signUpForm : FormGroup;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}";

  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$"

  alertFlag : Boolean = false

  alertContent: String

  constructor(private fb:FormBuilder,private  router:Router,private userService :UserService) { }

  ngOnInit(): void {
    this.signInForm  = this.fb.group({
      email:  ['',Validators.required],
      password:  ['',Validators.required],
    });

    this.signUpForm  = this.fb.group({
      name:  ['',Validators.required],
      email: ['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:  ['',[Validators.required,Validators.pattern(this.passwordPattern)]],
      confirmpassword:  ['',Validators.required],
      mobile:   ['',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      address:  ['',Validators.required],
    });
  }


  signUpUser(){
     if(this.signUpForm.valid){
       if(this.signUpForm.get('password').value === this.signUpForm.get('confirmpassword').value){
        this.userService.signUpUser(this.signUpForm.value).subscribe((data:any)=>{
          console.log(data)
          if(data.success)
          {
            alert("Account created sucessfully")
            this.toggleDisplay();
            this.router.navigate(['login']);
          }
          else{
            console.log("Error in account creation")
            this.alertFlag = true
            this.alertContent = "Error in account creation"
          }
        });
       }else{
         console.log("Password and Confirm Password doen not match")
        this.alertFlag = true
        this.alertContent = "Password and Confirm Password doen not match"
      }
    }else{
      console.log("Fill the all required Fields")
      this.alertFlag = true
      this.alertContent = "Fill the all required Fields"
    }
  }

  signInUser(){
    if(this.signInForm.valid){
       this.userService.signInUser(this.signInForm.value).subscribe((data:any)=>{
         console.log(data)
         if(data.success)
         {
           if(data.role==="USER")
           {
             this.userService.setUserLoggedIn(data.id);
           }
           else{
             this.userService.setAdminLoggedIn();
           }
           this.userService.setToken(data.jwttoken);
           this.router.navigate(['home']);
         }
         else{
           console.log("Error in user login")
           this.alertFlag = true
           this.alertContent = "Error in user login"
         }
       });
      }else{
     console.log("Fill the all required Fields")
     this.alertFlag = true
     this.alertContent = "Fill the all required Fields"
   }
  }

  toggleDisplay(){
    this.signInFlag = !this.signInFlag
    this.alertFlag=false
  }

}
