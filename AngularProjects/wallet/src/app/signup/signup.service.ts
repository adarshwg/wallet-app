import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  signup(){
    return this.httpClient.post('http://localhost:8000/auth/signup', this.formData)
  }
}
