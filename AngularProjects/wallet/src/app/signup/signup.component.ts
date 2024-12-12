import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from './signup.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { LoginService } from '../login/login.service';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private loginService:LoginService, private router:Router){}
  signupForm =  new FormGroup({
    username :new FormControl('',{
      validators : [Validators.required]
    }),
    password: new FormControl('',{
      validators:[Validators.required]
    }),
    mudraPin: new FormControl('',{
      validators:[Validators.required]
    })
  })
  signupService = inject(SignupService)
  ngOnInit(): void {
    
  }
  onSubmit(){
    let formValues = this.signupForm.value
    const username = formValues.username;
    const password = formValues.password;
    const mudraPin = formValues.mudraPin;
    const otp : number = 0;
    let formData = new FormData()
    formData.append("grant_type","password")
    formData.append("username",username!)
    formData.append("password",password!)
    formData.append("client_secret",mudraPin!)
    this.signupService.getSignupStatus(formData).subscribe(
      (status)=> {
        console.log(status)
        if(status){
          this.router.navigate(['signup','otp'])
        }
      }
    )

  }
}
