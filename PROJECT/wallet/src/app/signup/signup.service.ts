import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupURL } from '../endpoints/auth-endpoints';
import { TokenModel } from '../modals/token-modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private httpClient:HttpClient){}
  email!:string
  formData!:FormData
  getEmail(){
    return this.email
  }
  setEmail(email:string){
    this.email = email;
  }
  setSignupData(formData:FormData){
    this.formData = formData;
  }
  getSignupData(){
    return this.formData
  }
  signup() : Observable<TokenModel>{
    console.log(this.formData)
    return this.httpClient.post<TokenModel>(SignupURL, this.formData)
  }
}
