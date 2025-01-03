import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from './signup.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { LoginService } from '../login/login.service';
import { OtpComponent } from '../otp/otp.component';

@Component({
    selector: 'app-signup',
    imports: [ReactiveFormsModule, RouterLink, NavbarComponent, OtpComponent],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent{
  constructor(private signupService:SignupService){}
  signupForm =  new FormGroup({
    username :new FormControl('',{
      validators : [Validators.required]
    }),
    email: new FormControl('',{
      validators: [Validators.required]
    }),
    password: new FormControl('',{
      validators:[Validators.required]
    }),
    mudraPin: new FormControl('',{
      validators:[Validators.required]
    })
  })
  otpVerification = false;
  formData= new FormData();
  onSubmit(){
    let formValues = this.signupForm.value
    const username = formValues.username;
    const email = formValues.email;
    const password = formValues.password;
    const mudraPin = formValues.mudraPin;
    this.formData.append("username",username!)
    this.formData.append("client_id",email!)
    this.formData.append("password",password!)
    this.formData.append("client_secret",mudraPin!)
    this.otpVerification = true;
    this.signupService.setSignupData(this.formData)
    this.signupService.setEmail(email!)
    console.log(this.formData)
    console.log(this.signupService.getEmail())
    console.log(this.signupService.getSignupData())
  }
  
}
