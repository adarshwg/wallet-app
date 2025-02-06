import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupURL } from '../endpoints/auth-endpoints';
import { TokenModel } from '../modals/token-modal';
import { Observable } from 'rxjs';
import { SignupModel } from '../modals/user-credentials-modals';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private httpClient:HttpClient){}
  formData!:SignupModel
  setSignupData(formData:SignupModel){
    this.formData = formData;
  }
  getSignupData(){
    return this.formData
  }
  signup(){
    console.log(this.formData)
    return this.httpClient.post(SignupURL, this.formData)
  }
}
