import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private otp?: number
  verify(entered_otp:number){
    console.log(entered_otp)
    console.log('otp generated is ', this.otp)
    if(entered_otp == this.otp){
      console.log('entered _ otp' , entered_otp, 'and ' , this.otp)
      return true;
    }
    else return false;
  }
  constructor(httpClient: HttpClient) {
    const subscription = httpClient.get(
      'http://localhost:8000/otp'
    ).subscribe(
      {
        next: (resData:any) => {
          console.log('otp was called')
          console.log(resData)
          this.otp=resData
        }
      }
    )
  }
}
