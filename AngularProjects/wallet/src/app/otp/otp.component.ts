import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OtpService } from './otp.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent{
  otpForm =  new FormGroup({
    otp : new FormControl('',{
      validators : [Validators.required,Validators.maxLength(6)]
    })
  })
  otpService = inject(OtpService)
  router = inject(Router)
  onSubmit(){    
    console.log('form being submitted')
    const entered_otp = parseInt(this.otpForm.value.otp!)
    const otpVerified = this.otpService.verify(entered_otp)
    if(otpVerified){
      this.router.navigate(['home'])
    }
  }
}
