import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFlag : Boolean = false

  signInForm: FormGroup;

  signUpForm : FormGroup;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}";

  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$"


  constructor(private fb:FormBuilder,private  router:Router) { }

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

  signInUser(){
    console.log(this.signInForm.value)
  }

  signUpUser(){
    console.log(this.signUpForm.value)
  }

  toggleDisplay(){
    this.signInFlag = !this.signInFlag
  }

}
