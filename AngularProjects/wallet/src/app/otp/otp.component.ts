import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OtpService } from './otp.service';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  constructor(
    private signupService: SignupService,
    private otpService: OtpService,
    private router: Router
  ) {}
  otpForm = new FormGroup({
    otp: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(6)],
    }),
  });
  email!: string;
  otp!: string;
  ngOnInit(): void {
    this.email = this.signupService.getEmail();
    console.log(this.signupService.getEmail());
    this.otpService.sendOTP(this.email).subscribe({
      next: (resData: any) => {
        this.otpService.setOtp(resData);
        this.otp = resData;
        console.log(resData);
      },
    });
  }
  onVerify() {
    const verified = this.otpService.verify(this.otpForm.value.otp!);
    if (verified) {
      this.signupService.signup().subscribe({
        next: (resData: any) => {
          const access_token = resData.access_token;
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
