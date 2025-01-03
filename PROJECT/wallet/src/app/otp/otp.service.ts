import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private otpHash?: string;
  setOtp(otpHash:string){
    this.otpHash = otpHash
  }
  constructor(private httpClient: HttpClient) {}
  verify(entered_otp: string) {
    console.log(entered_otp);
    console.log('otp generated is ', this.otpHash);
    if (entered_otp == this.otpHash) {
      console.log('entered _ otp', entered_otp, 'and ', this.otpHash);
      return true;
    } else return false;
  }
  verifyOTP(entered_otp:string){
    console.log(entered_otp)
    return this.httpClient.post('http://localhost:8000/otp/verify',{
      "entered_otp" :  entered_otp,
      "hashed_otp" : this.otpHash
    })
  }
  sendOTP(email: string) {
    return this.httpClient.get('http://localhost:8000/otp/')
  }
}
